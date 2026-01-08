
import { Timestamp } from "firebase/firestore";

export interface MockInterview {
    id?: string;
    userId: string;
    userEmail: string;
    title: string;
    date: string;
    time: string;
    interviewer: string;
    type: string;
    meetLink?: string;
    googleEventId?: string;
    createdAt: Timestamp | Date;
}

export const INTERVIEW_COLLECTION = "mock_interviews";
