"use client";

import { Button } from "@/components/ui/button";

interface ResumeTabProps {
  onView: () => void;
}

export default function ResumeTab({ onView }: ResumeTabProps) {
  return (
    <div className="
      w-40
      rounded-xl
      bg-background
      p-4
      shadow
      flex
      flex-col
      items-center
      gap-4
    ">
      <div className="font-semibold">Resume</div>

      <Button
        className="bg-purple-600 hover:bg-purple-700 text-white"
        size="sm"
        onClick={onView}
      >
        View
      </Button>
    </div>
  );
}
