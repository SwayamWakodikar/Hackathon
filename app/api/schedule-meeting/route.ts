
import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || !token.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description, startTime, endTime } = await req.json();

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token.accessToken as string });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const event = await calendar.events.insert({
            calendarId: "primary",
            requestBody: {
                summary: title,
                description: description,
                start: { dateTime: startTime },
                end: { dateTime: endTime },
                conferenceData: {
                    createRequest: {
                        requestId: Math.random().toString(36).substring(7),
                        conferenceSolutionKey: { type: "hangoutsMeet" },
                    },
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: "email", minutes: 24 * 60 },
                        { method: "popup", minutes: 10 },
                    ],
                },
            },
            conferenceDataVersion: 1,
        });

        return NextResponse.json({
            success: true,
            meetLink: event.data.htmlLink,
            googleEventId: event.data.id
        });

    } catch (error) {
        console.error("Error creating calendar event:", error);
        return NextResponse.json({ error: "Failed to schedule on Google Calendar" }, { status: 500 });
    }
}
