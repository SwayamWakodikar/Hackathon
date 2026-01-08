import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "Vplace Interview Coach",
    },
});

export interface InterviewQuestion {
    question: string;
    context?: string;
    difficulty?: string;
}

export async function generateInterviewQuestions(category: string, level: string = "Intermediate", count: number = 5): Promise<InterviewQuestion[]> {
    try {
        const prompt = `You are an expert technical interviewer. Generate ${count} interview questions for a candidate specializing in "${category}" at an "${level}" level. 
    
    Return the response in the following JSON format ONLY, without any markdown formatting or code blocks:
    [
      {
        "question": "The actual question text",
        "context": "Brief context or what specifically to look for in the answer",
        "difficulty": "Easy/Medium/Hard"
      }
    ]`;

        const completion = await openai.chat.completions.create({
            model: "google/gemma-3-27b-it:free",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant that generates structured interview questions. You must output valid JSON only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content || '[]';

        // Attempt to parse JSON. If it fails, or is wrapped in markdown, clean it.
        let questions: InterviewQuestion[] = [];
        try {
            // Remove markdown code blocks if present
            const jsonString = content.replace(/^```json\s*|\s*```$/g, '');
            const parsed = JSON.parse(jsonString);

            // Handle if the API returns { "questions": [...] } or just [...]
            if (Array.isArray(parsed)) {
                questions = parsed;
            } else if (parsed.questions && Array.isArray(parsed.questions)) {
                questions = parsed.questions;
            } else {
                // Fallback parsing or error
                console.warn("Unexpected JSON structure:", parsed);
                // Try to salvage if it's an object with numbered keys? Unlikely based on prompt.
            }
        } catch (e) {
            console.error("JSON parse error:", e);
            // Fallback: Split by newlines if JSON fails? No, that's risky.
            // Maybe return a dummy error question.
            questions = [{ question: "Failed to generate questions. Please try again.", difficulty: "N/A" }];
        }

        return questions;

    } catch (error) {
        console.error('Error generating interview questions:', error);
        return [];
    }
}
