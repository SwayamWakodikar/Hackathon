"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
  markdown: string;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ open, onClose, markdown }) => {
  const downloadMarkdown = (content: string) => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Resume Preview</DialogTitle>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => downloadMarkdown(markdown)}
              disabled={!markdown}
            >
              Download
            </Button>
          </div>
        </DialogHeader>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 pr-2">
          {markdown ? (
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{
                __html: markdown
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold mb-2">${line.slice(2)}</h1>`;
                    if (line.startsWith('## ')) return `<h2 class="text-2xl font-semibold mt-6 mb-3">${line.slice(3)}</h2>`;
                    if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold mt-4 mb-2">${line.slice(4)}</h3>`;
                    if (line.startsWith('- ')) return `<li class="ml-6">${line.slice(2)}</li>`;
                    if (line.startsWith('* ')) return `<li class="ml-6">${line.slice(2)}</li>`;
                    return line ? `<p class="mb-2">${line}</p>` : '';
                  })
                  .join('')
              }} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No resume to preview</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreviewModal;