"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
// Using IconBrandWindows as a fallback for Microsoft as discussed
import { 
  IconBrandGoogle, 
  IconBrandAmazon, 
  IconBrandApple, 
  IconBrandWindows as IconBrandMicrosoft,
  IconLayoutGrid
} from "@tabler/icons-react";

// Ensure these slugs match the keys in your questions.ts file exactly
const COMPANIES = [
  {
    name: "Google",
    slug: "google",
    description: "Focus on DSA, System Design, and Go/Python.",
    icon: <img className="w-8 h-8" src="https://static.cdnlogo.com/logos/g/38/google-icon.svg" />,
  },
  {
    name: "Amazon",
    slug: "amazon",
    description: "Emphasis on Leadership Principles and Scalability.",
    icon: <IconBrandAmazon className="text-orange-500" size={32} />,
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    description: "Tests on OS fundamentals, C#, and Azure ecosystem.",
    icon: <img className="w-8 h-8" src="https://static.cdnlogo.com/logos/m/95/microsoft.svg" />,
  },
  {
    name: "Apple",
    slug: "apple",
    description: "Advanced Low-level programming and Swift/Objective-C.",
    icon: <img className="w-8 h-8" src="https://static.cdnlogo.com/logos/a/36/apple.svg" /  >,
  },
];

const CompanySelection = () => {
  const router = useRouter();

  return (
    <div className="p-8 flex-1 bg-transparent flex flex-col relative min-h-screen">
      {/* Background Glow Effect - cite: [app/trainer/mocktest/page.tsx] */}
      <div className="absolute top-40 left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Left Heading */}
      <div className="w-full max-w-7xl mx-auto z-10">
        <h1 className="text-4xl font-bold mb-8 text-left">
          <span className="text-blue-600">Mock Test</span>
        </h1>
        <p className="text-gray-400 mb-12">Select a company to begin your specialized assessment.</p>
      </div>

      {/* Center Grid of Company Cards */}
      <div className="flex-1 flex items-start justify-center z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {COMPANIES.map((company) => (
            <Card 
              key={company.slug}
              className="cursor-pointer bg-white/5 backdrop-blur-xl border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 group"
              // UPDATED: Points to /[companySlug] instead of /companies/[companySlug]
              onClick={() => router.push(`/trainer/mocktest/${company.slug}`)}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                  {company.icon}
                </div>
                <div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                    {company.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {company.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanySelection;