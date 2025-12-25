"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface Props {
  open: boolean;
  onClose: () => void;
  markdown: string;
}

export default function ResumePreviewModal({
  open,
  onClose,
  markdown,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        
        <DialogHeader className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold">Resume Preview</h2>

          <Button variant="outline" onClick={() => downloadMarkdown(markdown)}>
            Download
          </Button>
        </DialogHeader>

        <div className="prose max-w-none mt-4">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

      </DialogContent>
    </Dialog>
  );
}
function downloadMarkdown(content: string) {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.md";
  a.click();

  URL.revokeObjectURL(url);
}
