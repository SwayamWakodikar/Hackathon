import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "Vplace Resume Builder",
  },
});

export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  education: string;
  skills: string;
  experience: string;
  summary?: string;
  objective?: string;
  certifications?: string;
  projects?: string;
}

export async function generateResume(data: ResumeData | string): Promise<string> {
  try {
    let resumeContent = '';
    
    if (typeof data === 'string') {
      // If it's file content
      resumeContent = data;
    } else {
      // If it's structured data
      const { name, email, phone, address, education, skills, experience, summary, objective, certifications, projects } = data;
      
      resumeContent = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Address: ${address || 'Not provided'}
        
        ${summary ? `Summary:\n${summary}\n` : ''}
        ${objective ? `Objective:\n${objective}\n` : ''}
        
        Education:
        ${education}
        
        Skills:
        ${skills}
        
        Experience:
        ${experience}
        
        ${certifications ? `Certifications:\n${certifications}\n` : ''}
        ${projects ? `Projects:\n${projects}\n` : ''}
      `;
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-27b-it:free",
      messages: [
        {
          role: "system",
          content: `You are a professional resume writer. Create a well-structured, professional resume in markdown format.
          
          Guidelines:
          1. Start with a clear title containing the person's name
          2. Include contact information
          3. Add a professional summary/objective (if provided)
          4. Structure education, skills, and experience clearly
          5. Use bullet points for lists
          6. Keep it concise and professional
          7. Make it ATS-friendly
          8. Use appropriate markdown formatting (headers, lists, etc.)
          
          Format example:
          # John Doe
          [Contact info]
          
          ## Professional Summary
          [Summary here]
          
          ## Education
          - [Degree details]
          
          ## Skills
          - [Skill 1]
          - [Skill 2]
          
          ## Experience
          ### [Job Title]
          [Company], [Dates]
          - [Achievement 1]
          - [Achievement 2]`
        },
        {
          role: "user",
          content: `Create a professional resume based on this information:\n\n${resumeContent}\n\nReturn the resume in clean markdown format.`
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedResume = completion.choices[0]?.message?.content || '';
    
    // Log to console as requested
    console.log('=== GENERATED RESUME MARKDOWN ===');
    console.log(generatedResume);
    console.log('=== END RESUME ===');
    
    return generatedResume;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw new Error('Failed to generate resume');
  }
}