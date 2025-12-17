import { NextRequest, NextResponse } from 'next/server';

interface ResumeData {
  contact: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    achievements: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  certifications: string[];
}

function jsonToMarkdown(resume: ResumeData): string {
  const { contact, summary, experience, skills, education, certifications } = resume;
  
  let md = `# ${contact.name}\n\n`;
  
  // Contact Info
  md += `**Email:** ${contact.email}  \n`;
  md += `**Phone:** ${contact.phone}  \n`;
  if (contact.linkedin) md += `**LinkedIn:** ${contact.linkedin}  \n`;
  md += '\n---\n\n';
  
  // Summary
  md += `## Professional Summary\n${summary}\n\n`;
  
  // Experience
  md += `## Work Experience\n`;
  experience.forEach(exp => {
    md += `### ${exp.title}\n`;
    md += `*${exp.company}* | ${exp.duration}\n\n`;
    exp.achievements.forEach(achievement => {
      md += `- ${achievement}\n`;
    });
    md += '\n';
  });
  
  // Skills
  md += `## Skills\n`;
  if (skills.technical.length > 0) {
    md += `### Technical Skills\n${skills.technical.join(', ')}\n\n`;
  }
  if (skills.soft.length > 0) {
    md += `### Soft Skills\n${skills.soft.join(', ')}\n\n`;
  }
  
  // Education
  md += `## Education\n`;
  education.forEach(edu => {
    md += `### ${edu.degree}\n`;
    md += `*${edu.institution}* | ${edu.year}\n\n`;
  });
  
  // Certifications
  if (certifications.length > 0) {
    md += `## Certifications\n`;
    certifications.forEach(cert => {
      md += `- ${cert}\n`;
    });
    md += '\n';
  }
  
  // Footer
  md += `---\n\n`;
  md += `*Generated with AI assistance on ${new Date().toLocaleDateString()}*`;
  
  return md;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // If you're getting the AI response directly (as shown in your logs)
    if (formData.role === 'assistant') {
      // Parse the JSON from AI response
      const aiResponse = JSON.parse(formData.content);
      
      // Convert to markdown
      const markdownContent = jsonToMarkdown(aiResponse);
      
      // Return both JSON and markdown
      return NextResponse.json({
        success: true,
        resume: markdownContent,
        json: aiResponse,
        filename: `${aiResponse.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.md`,
        timestamp: new Date().toISOString()
      });
    }
    
    // If you need to call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "allenai/olmo-3.1-32b-think:free",
        "messages": [
          {
            "role": "user",
            "content": `Create a professional resume based on the following information:
            User Input: ${JSON.stringify(formData)}
            
            Generate a resume with these sections:
            1. Contact Information
            2. Professional Summary
            3. Work Experience (with bullet points)
            4. Skills (categorized)
            5. Education
            6. Certifications (if applicable)
            
            Format the response as structured JSON with this exact schema:
            {
              "contact": { "name": "", "email": "", "phone": "", "linkedin": "" },
              "summary": "",
              "experience": [{ "title": "", "company": "", "duration": "", "achievements": [] }],
              "skills": { "technical": [], "soft": [] },
              "education": [{ "degree": "", "institution": "", "year": "" }],
              "certifications": []
            }`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const result = await response.json();
    const assistantMessage = result.choices[0].message;
    
    // Parse the JSON response
    const resumeJson = JSON.parse(assistantMessage.content);
    
    // Convert to markdown
    const markdownContent = jsonToMarkdown(resumeJson);
    
    return NextResponse.json({
      success: true,
      resume: markdownContent,
      json: resumeJson,
      filename: `${resumeJson.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.md`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error("Error generating resume:", error);
    return NextResponse.json(
      { error: "Failed to generate resume", details: error.message },
      { status: 500 }
    );
  }
}