"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/home-components/Header";
import HeroSection from "@/components/home-components/HeroSection";
import TabSelector from "@/components/home-components/TabSelector";
import UploadTab from "@/components/home-components/Upload";
import ManualTab, { FormData } from "@/components/home-components/ManualTab";
import Particles from "../Particles";

const Homepage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");

  const generateResume = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            address: "123 Main St, City, Country",
            education: "B.Sc. in Computer Science",
            skills: "React, Node.js, AWS",
            experience: "5 years as a Full-Stack Developer",
          },
        }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      if (data.success) {
        console.log("Redirecting to /resume/dashboard...");
        router.push("/resume/dashboard"); // Redirect to dashboard
      } else {
        console.error("Failed to generate resume:", data.error);
      }
    } catch (error) {
      console.error("Error generating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromFile = (file: File) => {
    console.log("Generating resume from file:", file.name);
    alert(`Generating your AI-powered resume from ${file.name}! 🚀`);
  };

  const handleGenerateFromForm = (data: FormData) => {
    console.log("Generating resume from form data:", data);
    alert("Generating your AI-powered resume! 🚀");
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.01}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className={`min-h-screen transition-colors duration-300`}>
        <HeroSection isDark={isDark} />
        <TabSelector
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
        />

        <div className="container mx-auto px-6">
          {activeTab === "upload" ? (
            <UploadTab isDark={isDark} onGenerate={handleGenerateFromFile} />
          ) : (
            <ManualTab isDark={isDark} onGenerate={handleGenerateFromForm} />
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;

