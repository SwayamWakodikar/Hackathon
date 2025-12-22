"use client";

import React, { useState } from 'react';
import ResumeTab from './ResumeTab';
import ResumePreviewModal from './ResumePreviewModal';

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [resumeMarkdown, setResumeMarkdown] = useState<string>('');
  
  // Example: This would be called when user generates a resume
  const handleGenerateResume = (generatedMarkdown: string) => {
    setResumeMarkdown(generatedMarkdown);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-foreground">
          <span className="text-purple-600 dark:text-purple-400">VPlace</span>
        </h1>

        {/* Main Content Area */}
        <div className="bg-muted/50 dark:bg-muted/30 rounded-3xl p-8 shadow-lg border border-border">
          {/* Your Generated Resume Title */}
          <h1 className="text-2xl font-semibold mb-6 text-foreground">
            Your Generated Resume
          </h1>
          
          <div className="flex gap-6">
            {/* Resume Card - Pass dynamic data */}
            <ResumeTab 
              onView={() => setShowModal(true)} 
              resumeData={resumeMarkdown}
              hasResume={!!resumeMarkdown}
            />

            {/* Empty Space */}
            <div className="flex-1"></div>
          </div>
        </div>

        {/* Modal */}
        <ResumePreviewModal
          open={showModal}
          onClose={() => setShowModal(false)}
          markdown={resumeMarkdown}
        />
      </div>
    </div>
  );
};

export default Dashboard;