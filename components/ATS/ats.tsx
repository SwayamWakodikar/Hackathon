"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Ats = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const atsResult = {
    score: 74,
    matched: ["React", "JavaScript", "Next.js"],
    missing: ["TypeScript", "Docker", "CI/CD"],
  };

  const handleFile = (file: File) => {
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!jobDesc || !resumeFile) return;
    setAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">ATS Checker</h1>
          <p className="text-muted-foreground">
            Match your resume against company requirements
          </p>
        </div>

        {/* Input Tabs */}
        <Card className="bg-card/80 backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Input Details</CardTitle>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="jd">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="jd">Company Requirements</TabsTrigger>
                <TabsTrigger value="resume">Upload Resume</TabsTrigger>
              </TabsList>

              {/* Job Description */}
              <TabsContent value="jd">
                <Textarea
                  placeholder="Paste the job description here..."
                  className="min-h-55"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </TabsContent>

              {/* Drag & Drop Resume */}
              <TabsContent value="resume">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-10 text-center transition
                    ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) =>
                      e.target.files && handleFile(e.target.files[0])
                    }
                  />

                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer space-y-2 block"
                  >
                    <p className="text-lg font-medium">
                      Drag & drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to upload (PDF, DOC, DOCX)
                    </p>
                  </label>

                  {resumeFile && (
                    <p className="mt-4 text-sm font-medium text-primary">
                      Uploaded: {resumeFile.name}
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <Button className="mt-6 w-full" onClick={handleAnalyze}>
              Check ATS Score
            </Button>
          </CardContent>
        </Card>

        {/* Result Section */}
        {analyzed && (
          <>
            <Card className="bg-card/80 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>ATS Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold">
                    {atsResult.score}%
                  </span>
                  <Badge
                    variant={
                      atsResult.score >= 70 ? "default" : "destructive"
                    }
                  >
                    {atsResult.score >= 70
                      ? "ATS Friendly"
                      : "Needs Improvement"}
                  </Badge>
                </div>
                <Progress value={atsResult.score} />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Matched Keywords</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {atsResult.matched.map((kw) => (
                    <Badge key={kw} variant="secondary">
                      {kw}
                    </Badge>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Missing Keywords</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {atsResult.missing.map((kw) => (
                    <Badge key={kw} variant="destructive">
                      {kw}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Add missing keywords naturally in skills and experience.</p>
                <p>• Keep resume ATS-friendly (no tables or icons).</p>
                <p>• Match role titles with job description.</p>

                <Separator />
                <Button>Optimize Resume</Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Ats;
