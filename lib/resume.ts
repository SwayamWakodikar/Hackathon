
import { Timestamp } from "firebase/firestore";


export interface ResumeDocument {
  markdown: string;
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };

  
  updatedAt: Timestamp | Date;

  
  pdfUrl?: string;


  originalData?: {
    name: string;
    email: string;
    skills: string;
    experience: string;
    education: string;
  };
}


export const COLLECTIONS = {
  RESUMES: "resumes",
} as const;