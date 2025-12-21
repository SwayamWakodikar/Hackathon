"use client";

import { useState } from "react";
import ResumeTab from "./ResumeTab";
import ResumePreviewModal from "./ResumePreviewModal";
// dummy markdown content
const resumeMarkdown = `

# John Doe
Software Engineer

## Skills
- JavaScript
- React
- Next.js
`;

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        <span className="text-purple-600">AI</span> Resume
      </h1>

      <div className="flex gap-6 rounded-2xl bg-muted p-6">
        
        <ResumeTab onView={() => setOpen(true)} />

        <div className="flex-1 rounded-xl bg-background" />
      </div>

      <ResumePreviewModal
        open={open}
        onClose={() => setOpen(false)}
        markdown={resumeMarkdown}
      />
    </div>
  );
}
