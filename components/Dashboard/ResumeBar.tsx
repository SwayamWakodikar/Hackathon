"use client";

interface ResumeTabProps {
  title: string;
  subtitle?: string;
  onClick: () => void;
}

export default function ResumeTab({
  title,
  subtitle = "AI Generated Resume",
  onClick,
}: ResumeTabProps) {
  return (
    <button
      onClick={onClick}
      className="
        min-w-55
        rounded-lg
        border
        p-4
        text-left
        transition
        bg-background
        text-foreground
        border-border
        hover:bg-muted
        focus:outline-none
        focus:ring-2
        focus:ring-ring
      "
    >
      <h3 className="text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-xs text-muted-foreground">
        {subtitle}
      </p>
    </button>
  );
}
