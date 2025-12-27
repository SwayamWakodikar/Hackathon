"use client";

import { useState, DragEvent, ChangeEvent } from "react";
import { Upload, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UploadTabProps {
  isDark: boolean;
  onGenerate: (file: File) => void;
}

export default function UploadTab({ isDark, onGenerate }: UploadTabProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile) return;
    
    setIsGenerating(true);
    
    try {
      // Read file content
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        // Send to API
        const response = await fetch('/api/generate-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileContent: content,
          }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          console.log('Generated Resume:', data.resume);
          alert('Resume generated successfully! Check console for markdown output.');
          // You can pass the resume data to parent component if needed
          onGenerate(uploadedFile);
        } else {
          alert('Failed to generate resume: ' + data.error);
        }
      };
      
      reader.readAsText(uploadedFile);
    } catch (error) {
      console.error('Error:', error);
      alert('Error generating resume');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card
      className={`max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg border border-border`}
    >
      <CardHeader>
        <CardTitle className="text-black dark:text-white">
          Upload Your Resume
        </CardTitle>
        <CardDescription className="text-black dark:text-white">
          Upload your existing resume and let AI enhance it
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
            dragActive
              ? isDark
                ? "border-purple-400 bg-purple-900/20"
                : "border-purple-500 bg-purple-50"
              : isDark
              ? "border-gray-600 hover:border-gray-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <Upload
            className={`w-16 h-16 mx-auto mb-4 ${
              isDark ? "text-gray-400" : "text-gray-400"
            }`}
          />
          {uploadedFile ? (
            <div>
              <p
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {uploadedFile.name}
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                File uploaded successfully!
              </p>
            </div>
          ) : (
            <div>
              <p
                className={`text-lg font-semibold mb-2 "text-black dark:text-white"`}
              >
                Drag and drop your resume here
              </p>
              <p
                className={`text-sm text-black dark:text-white mb-4`}
              >
                Supports PDF, DOC, DOCX, TXT files
              </p>
            </div>
          )}
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
          />
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer border-2! border-purple-600! text-purple-600! hover:bg-purple-50!"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Browse Files
          </Button>
        </div>
        {uploadedFile && (
          <Button
            className={`w-full mt-6 ${
              !isDark ? "bg-purple-600 hover:bg-purple-700 text-white" : ""
            }`}
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {isGenerating ? "Generating..." : "Generate AI Resume"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}