import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with OpenRouter
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
      // If file was uploaded, use its content
      resumeContent = fileContent;
    } else if (formData) {
      // If manual form was filled, structure the data
      const { name, email, phone, address, education, skills, experience } = formData;
      
      resumeContent = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
        
        Education:
        ${education}
        
        Skills:
        ${skills}
        
        Experience:
        ${experience}
      `;
    }

    // Generate resume using AI
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-27b-it:free",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Create a well-structured, professional resume in markdown format based on the provided information. Include appropriate sections, formatting, and professional language. Make sure it's ATS-friendly."
        },
        {
          role: "user",
          content: `Create a professional resume based on this information:\n\n${resumeContent}\n\nReturn the resume in clean markdown format with appropriate sections.`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedResume = completion.choices[0]?.message?.content || '';

    // Log the generated resume to console
    console.log('Generated Resume Markdown:', generatedResume);

    return NextResponse.json({
      success: true,
      resume: generatedResume,
      message: 'Resume generated successfully'
    });

  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json(
      { error: 'Failed to generate resume', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}