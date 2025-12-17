export interface ResumeData {
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