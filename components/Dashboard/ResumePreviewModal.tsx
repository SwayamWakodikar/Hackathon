"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
  markdown: string;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({
  open,
  onClose,
  markdown,
}) => {
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
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col bg-background">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Resume Preview</DialogTitle>
          <Button
            variant="outline"
            onClick={() => downloadMarkdown(markdown)}
            disabled={!markdown}
          >
            Download
          </Button>
        </DialogHeader>

        {/* Markdown Render */}
        <div className="overflow-y-auto flex-1 pr-4">
  {markdown ? (
    <div
      className="
        space-y-4
        text-sm
        text-foreground

        [&_h1]:text-3xl
        [&_h1]:font-bold

        [&_h2]:text-xl
        [&_h2]:font-semibold
        [&_h2]:mt-6

        [&_h3]:text-lg
        [&_h3]:font-semibold

        [&_strong]:font-bold
        [&_em]:italic

        [&_ul]:list-disc
        [&_ul]:ml-6

        [&_li]:mb-1

        [&_p]:leading-relaxed
      "
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
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
