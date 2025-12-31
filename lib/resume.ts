// lib/resume.ts
import { Timestamp } from "firebase/firestore";

/**
 * Represents the structure of a Resume document in Firestore
 * This acts as your 'Schema' for the project.
 */
export interface ResumeDocument {
  // The actual AI-generated Markdown string
  markdown: string;

  // Metadata about the user from Google OAuth
  user: {
    name: string | null;
    email: string;
    image: string | null;
  };

  // Tracking when the resume was created/updated
  updatedAt: Timestamp | Date;

  // Optional: URL to the PDF version once you implement Storage
  pdfUrl?: string;

  // Optional: Store the original form data used to generate the resume
  originalData?: {
    name: string;
    email: string;
    skills: string;
    experience: string;
    education: string;
  };
}

/**
 * Collection Name Constants
 * Using constants prevents typos across your API and components
 */
export const COLLECTIONS = {
  RESUMES: "resumes",
} as const;