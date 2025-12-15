export const resumePrompt = ({
  name,
  education,
  skills,
  projects,
  experience,
  role,
}: any) => `
You are a professional resume writer.

Create a ONE PAGE ATS-FRIENDLY resume for a student.

Details:
Name: ${name}
Education: ${education}
Skills: ${skills}
Projects: ${projects}
Experience: ${experience}
Target Role: ${role}

Rules:
- Use bullet points
- Use strong action verbs
- Quantify impact where possible
- No emojis
- Clean professional tone
- Return response in MARKDOWN format
`;
