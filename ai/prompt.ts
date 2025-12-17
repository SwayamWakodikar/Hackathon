import { FormData } from "@/components/home-components/ManualTab";

export function createPrompt(formData: any): string{
  return `Create a professional resume based on the following information:
    User Input: "${JSON.stringify(formData)}"
    
    Generate a resume with these sections:
    1. Contact Information (generate placeholder if missing)
    2. Professional Summary
    3. Work Experience (with bullet points)
    4. Skills (categorized)
    5. Education
    6. Certifications (if applicable)
    
    Format the response as structured JSON with the following schema:
    {
      "contact": { "name": "", "email": "", "phone": "", "linkedin": "" },
      "summary": "",
      "experience": [{ "title": "", "company": "", "duration": "", "achievements": [] }],
      "skills": { "technical": [], "soft": [] },
      "education": [{ "degree": "", "institution": "", "year": "" }],
      "certifications": []
    }`;
}