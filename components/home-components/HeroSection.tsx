'use client';

interface HeroSectionProps {
  isDark: boolean;
}

export default function HeroSection({ isDark }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2 className="text-5xl font-bold mb-4 text-foreground dark:text-white ">
        Build Your Perfect Resume with AI
      </h2>
      <p className="text-xl mb-8 text-muted-foreground">
        Upload your old resume or fill in your details to create a professional, 
        ATS-friendly resume
      </p>
    </div>
  );
}