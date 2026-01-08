"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, FileText, Upload } from "lucide-react";

interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  analysis: string;
}

const Ats = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setResumeFile(file);

    const fileName = file.name.toLowerCase();

    // Accept only DOCX files
    if (!fileName.endsWith(".docx")) {
      setError(
        "Please upload only DOCX files. If you have a different format, convert it to DOCX first."
      );
      setResumeFile(null);
      return;
    }

    // For DOCX, try to extract text client-side as a preview
    try {
      const text = await extractTextFromDocxClient(file);
      if (text) {
        setResumeText(text.substring(0, 1000) + "..."); // Preview only
      }
    } catch (err) {
      console.log("Preview extraction failed, will rely on server processing");
    }
  };

  const extractTextFromDocxClient = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;

          // Simple text extraction - look for readable text in the binary
          const decoder = new TextDecoder("utf-8");
          const text = decoder.decode(
            arrayBuffer.slice(0, Math.min(arrayBuffer.byteLength, 100000))
          );

          // Extract likely text content (crude but works for simple DOCX)
          const lines = text.split("\n").filter(
            (line) =>
              line.match(/[a-zA-Z]{3,}/) && // At least 3 consecutive letters
              !line.includes("PK") && // Skip ZIP headers
              !line.includes("xml") // Skip XML tags
          );

          if (lines.length > 0) {
            resolve(lines.join("\n"));
          } else {
            reject(new Error("No readable text found"));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    setError(null);

    if (!jobDesc.trim()) {
      setError("Please provide a job description");
      return;
    }

    if (!resumeFile && !resumeText.trim()) {
      setError("Please upload a resume file or paste your resume text");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("jobDescription", jobDesc);

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      }
      if (resumeText.trim()) {
        formData.append("resumeText", resumeText);
      }

      console.log("Sending request to API...");
      const response = await fetch("/api/ats/analyze", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.details ||
            `Analysis failed with status ${response.status}`
        );
      }

      setAtsResult(data.data);
      setAnalyzed(true);
    } catch (error) {
      console.error("Full analysis error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to analyze resume";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalyzed(false);
    setAtsResult(null);
    setResumeFile(null);
    setResumeText("");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            ATS Resume Checker
          </h1>
          <p className="text-muted-foreground">
            Upload your resume and job description to check ATS compatibility
          </p>
          {analyzed && (
            <Button variant="outline" onClick={resetAnalysis} className="mt-4">
              Analyze Another Resume
            </Button>
          )}
        </div>

        {!analyzed ? (
          <>
            {error && (
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Card className="bg-card/80 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Step 1: Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the full job description here...
                  
Example Software Engineer role:
• 3+ years experience with React and TypeScript
• Strong knowledge of Next.js and Node.js
• Experience with AWS (Lambda, S3, DynamoDB)
• Familiarity with CI/CD pipelines
• Excellent problem-solving skills
• Bachelor's degree in Computer Science or related field"
                  className="min-h-64"
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Include all requirements, skills, and qualifications mentioned
                  in the job posting.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Step 2: Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger
                      value="upload"
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload File
                    </TabsTrigger>
                    <TabsTrigger
                      value="paste"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Paste Text
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={handleDrop}
                      className={`border-3 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 ${
                        dragActive
                          ? "border-primary bg-primary/5 scale-[1.02]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="file"
                        accept=".docx"
                        className="hidden"
                        id="resume-upload"
                        onChange={(e) =>
                          e.target.files && handleFile(e.target.files[0])
                        }
                      />

                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer space-y-4 block"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-3 rounded-full bg-primary/10">
                            <Upload className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">
                              Drag & drop your resume
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              or click to browse files
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              DOCX only
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Maximum file size: 5MB
                          </p>
                        </div>
                      </label>

                      {resumeFile && (
                        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">
                                  {resumeFile.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(resumeFile.size / 1024).toFixed(1)} KB •
                                  DOCX
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setResumeFile(null)}
                              className="h-8 w-8 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium mb-1">Note:</p>
                      <p>
                        Only DOCX files are supported. Convert other formats to
                        DOCX or paste content below.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="paste" className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Paste your resume content (recommended for best
                        results):
                      </p>
                      <Textarea
                        placeholder="Paste your full resume content here...
                        
Example:
John Doe
Software Engineer
Email: john@example.com
Phone: (123) 456-7890

EXPERIENCE
Senior Software Engineer at Tech Corp (2020-Present)
- Developed web applications using React and TypeScript
- Implemented AWS services including Lambda and S3
- Led team of 5 developers using Agile methodologies

SKILLS
JavaScript, TypeScript, React, Node.js, AWS, Git, Docker"
                        className="min-h-80 font-mono text-sm"
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        disabled={!!resumeFile}
                      />
                      {resumeFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Remove the uploaded file to paste text instead.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <Button
                  className="mt-8 w-full py-6 text-lg font-semibold"
                  onClick={handleAnalyze}
                  disabled={
                    loading ||
                    (!jobDesc.trim() && !resumeFile && !resumeText.trim())
                  }
                  size="lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing Resume...
                    </>
                  ) : (
                    "Check ATS Compatibility"
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          // Result Section
          <>
            <Card className="bg-card/80 backdrop-blur border-border">
              <CardHeader>
                <CardTitle className="text-2xl">ATS Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">
                          Compatibility Score
                        </h3>
                        <Badge
                          variant={
                            atsResult && atsResult.score >= 70
                              ? "default"
                              : "destructive"
                          }
                          className="text-sm"
                        >
                          {atsResult && atsResult.score >= 70
                            ? "ATS Optimized"
                            : atsResult && atsResult.score >= 50
                            ? "Needs Work"
                            : "Poor Match"}
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">
                          {atsResult?.score}%
                        </span>
                        <span className="text-muted-foreground">/ 100%</span>
                      </div>
                      <Progress value={atsResult?.score} className="h-3 mt-3" />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">
                        Score Interpretation:
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <strong>80-100%:</strong> Excellent ATS
                          compatibility
                        </li>
                        <li>
                          • <strong>60-79%:</strong> Good, but could be improved
                        </li>
                        <li>
                          • <strong>40-59%:</strong> Needs significant
                          improvement
                        </li>
                        <li>
                          • <strong>Below 40%:</strong> Poor match for this role
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Quick Stats
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-500">
                            {atsResult?.matchedKeywords.length || 0}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Keywords Matched
                          </div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-destructive">
                            {atsResult?.missingKeywords.length || 0}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Keywords Missing
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Recommendation:</h4>
                      <p className="text-sm">
                        {atsResult && atsResult.score >= 70
                          ? "Your resume is well-optimized for this role. Consider applying!"
                          : atsResult && atsResult.score >= 50
                          ? "Your resume needs improvements before applying."
                          : "Significant improvements needed before applying."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-500">
                      ✓
                    </Badge>
                    Matched Keywords
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Keywords from the job description found in your resume
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {atsResult?.matchedKeywords.map((kw) => (
                      <Badge
                        key={kw}
                        variant="secondary"
                        className="text-sm bg-green-500/10 text-green-600 border-green-500/20"
                      >
                        {kw}
                      </Badge>
                    ))}
                  </div>
                  {atsResult?.matchedKeywords.length === 0 && (
                    <p className="text-muted-foreground text-sm italic">
                      No keywords matched. Consider adding relevant skills from
                      the job description.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="destructive">✗</Badge>
                    Missing Keywords
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Important keywords from job description not found in your
                    resume
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {atsResult?.missingKeywords.map((kw) => (
                      <Badge
                        key={kw}
                        variant="outline"
                        className="text-sm bg-destructive/10 text-destructive border-destructive/20"
                      >
                        {kw}
                      </Badge>
                    ))}
                  </div>
                  {atsResult?.missingKeywords.length === 0 && (
                    <p className="text-green-600 text-sm italic">
                      Excellent! All important keywords are present.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Suggestions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Actionable steps to improve your ATS score
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {atsResult?.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
                    >
                      <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Detailed Analysis:</h4>
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">
                      {atsResult?.analysis}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={() => window.open("/resume/home", "_blank")}
                    variant="default"
                    size="lg"
                    className="w-full"
                  >
                    Enhance Resume with AI
                  </Button>
                  <Button
                    onClick={resetAnalysis}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Ats;
