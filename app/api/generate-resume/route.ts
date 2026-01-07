import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db } from "@/lib/firebase";
import { ResumeDocument, COLLECTIONS } from "@/lib/resume";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ensure this import path is correct

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "Vplace Resume Builder",
  },
});

export async function POST(request: NextRequest) {
  try {
    // 1. Check for user session immediately
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized: Please sign in with Google first.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { formData, fileContent } = body;

    if (!formData && !fileContent) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }

    let resumeContent = '';
    if (fileContent) {
      resumeContent = fileContent;
    } else if (formData) {
      const { name, email, phone, address, education, skills, experience } = formData;
      resumeContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n\nEducation:\n${education}\n\nSkills:\n${skills}\n\nExperience:\n${experience}`;
    }

    // 2. Generate resume using AI
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-27b-it:free",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Create a well-structured, professional resume in markdown format ONLY. Do NOT include any explanations, notes, or commentary. Only output the resume content in markdown. The resume should be ATS-friendly and contain: 1. Name as title, 2. Contact information, 3. Summary (if provided), 4. Education, 5. Skills, 6. Experience, 7. Other relevant sections. Use proper markdown formatting with headers, lists, and bullet points."
        },
        {
          role: "user",
          content: `Create a professional resume based on this information. Output ONLY the resume in markdown format with no additional text:\n\n${resumeContent}`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedResume = completion.choices[0]?.message?.content || '';

    // 3. Save to Firestore (Wrapped in a try-catch so AI result still returns if DB fails)
    try {
      const resumeData: ResumeDocument = {
        markdown: generatedResume,
        user: {
          name: session.user.name ?? null,
          email: session.user.email,
          image: session.user.image ?? null,
        },
        updatedAt: serverTimestamp() as any,
        originalData: formData ? { ...formData } : undefined
      };

      await setDoc(
        doc(db, COLLECTIONS.RESUMES, session.user.email), 
        resumeData, 
        { merge: true }
      );
      console.log('Resume successfully saved to Firestore for:', session.user.email);
    } catch (dbError) {
      console.error('Firestore Save Error:', dbError);
      // We continue so the user at least sees the generated resume on screen
    }

    return NextResponse.json({
      success: true,
      resume: generatedResume,
      message: 'Resume generated successfully'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate resume', 
        details: error instanceof Error ? error.message : 'Check your API key or network connection' 
      },
      { status: 500 }
    );
  }
}