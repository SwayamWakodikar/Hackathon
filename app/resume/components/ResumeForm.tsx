"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ResumeForm() {
  const [resume, setResume] = useState("");

  async function generateResume(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("/api/generate-resume", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const data = await res.json();
    setResume(data.resume);
  }

  return (
    <form onSubmit={generateResume} className="space-y-4">
      <Input name="name" placeholder="Name" required />
      <Input name="education" placeholder="Education" required />
      <Textarea name="skills" placeholder="Skills" required />
      <Textarea name="projects" placeholder="Projects" />
      <Textarea name="experience" placeholder="Experience" />
      <Input name="role" placeholder="Target Role" required />

      <Button type="submit">Generate Resume</Button>

      {resume && (
        <pre className="mt-6 p-4 bg-muted rounded-lg whitespace-pre-wrap">
          {resume}
        </pre>
      )}
    </form>
  );
}
