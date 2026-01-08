'use server'

import { generateInterviewQuestions, InterviewQuestion } from '@/lib/interview-questions';

export async function getQuestions(topic: string, level: string): Promise<InterviewQuestion[]> {
    return await generateInterviewQuestions(topic, level);
}
