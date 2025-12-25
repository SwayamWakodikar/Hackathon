"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

/* ---------------- DUMMY ATS DATA ---------------- */

const atsData = {
  score: 78,
  keywordMatch: 65,
  sections: [
    { name: "Skills", score: 85 },
    { name: "Experience", score: 72 },
    { name: "Education", score: 90 },
    { name: "Formatting", score: 70 },
  ],
  matchedKeywords: ["React", "Next.js", "JavaScript", "AWS"],
  missingKeywords: ["TypeScript", "Docker", "CI/CD"],
};

const Ats = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">ATS Score Predictor</h1>
          <p className="text-muted-foreground">
            Simulated ATS analysis based on resume content
          </p>
        </div>

        {/* Overall Score */}
        <Card className="bg-card/80 backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Overall ATS Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">
                {atsData.score}%
              </span>
              <Badge variant={atsData.score > 70 ? "default" : "destructive"}>
                {atsData.score > 70 ? "Good" : "Needs Improvement"}
              </Badge>
            </div>
            <Progress value={atsData.score} />
          </CardContent>
        </Card>

        {/* Section Scores */}
        <Card className="bg-card/80 backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Section-wise Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {atsData.sections.map((section) => (
              <div key={section.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{section.name}</span>
                  <span>{section.score}%</span>
                </div>
                <Progress value={section.score} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Keywords */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Matched Keywords */}
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Matched Keywords</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {atsData.matchedKeywords.map((kw) => (
                <Badge key={kw} variant="secondary">
                  {kw}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* Missing Keywords */}
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Missing Keywords</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {atsData.missingKeywords.map((kw) => (
                <Badge key={kw} variant="destructive">
                  {kw}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Suggestions */}
        <Card className="bg-card/80 backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Improvement Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>• Add missing technical keywords relevant to the job role.</p>
            <p>• Improve formatting consistency for better ATS parsing.</p>
            <p>• Include quantified achievements in experience section.</p>

            <Separator />

            <Button className="mt-4">
              Optimize Resume
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Ats;
