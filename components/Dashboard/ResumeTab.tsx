"use client";

import React from 'react';

interface ResumeTabProps {
  onView: () => void;
  resumeData: string;
  hasResume: boolean;
}

const ResumeTab: React.FC<ResumeTabProps> = ({ onView, resumeData, hasResume }) => {
  // Extract name from markdown (assumes format: # Name)
  const extractName = (markdown: string) => {
    const lines = markdown.split('\n');
    const nameLine = lines.find(line => line.startsWith('# '));
    return nameLine ? nameLine.replace('# ', '').trim() : 'No Name';
  };

  // Extract preview content from markdown
  const extractPreviewContent = (markdown: string) => {
    const lines = markdown.split('\n').filter(line => line.trim());
    return lines.slice(1, 15); // Get lines after the name for preview
  };

  const name = hasResume ? extractName(resumeData) : 'Generate Resume';
  const previewLines = hasResume ? extractPreviewContent(resumeData) : [];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Resume Preview Card */}
      <div className="bg-card rounded-2xl p-6 shadow-md w-56 h-80 border border-border overflow-hidden relative">
        {hasResume ? (
          <div className="text-sm text-muted-foreground space-y-3">
            {/* Name - Visible */}
            <div className="font-bold text-foreground text-base">{name}</div>
            
            {/* Blurred Content */}
            <div className="blur-sm select-none pointer-events-none">
              {previewLines.map((line, index) => (
                <div key={index} className="text-xs py-0.5">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">No resume generated yet</p>
              <p className="text-xs mt-2">Generate a resume to preview</p>
            </div>
          </div>
        )}
      </div>
      
      {/* View Button - Outside the card */}
      <button
        onClick={onView}
        disabled={!hasResume}
        className={`px-8 py-2 rounded-lg font-medium transition-all shadow-md w-full max-w-[200px] ${
          hasResume
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        view
      </button>
    </div>
  );
};

export default ResumeTab;