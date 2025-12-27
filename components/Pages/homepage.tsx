'use client';

import { useState } from 'react';
import Header from '@/components/home-components/Header';
import HeroSection from '@/components/home-components/HeroSection';
import TabSelector from '@/components/home-components/TabSelector';
import UploadTab from '@/components/home-components/Upload';
import ManualTab, { FormData } from '@/components/home-components/ManualTab';
import Particles from '../Particles';

export default function Homepage() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');

  const handleGenerateFromFile = (file: File) => {
    console.log('Generating resume from file:', file.name);
    // TODO: Implement file upload logic
    alert(`Generating your AI-powered resume from ${file.name}! 🚀`);
  };

  const handleGenerateFromForm = (data: FormData) => {
    console.log('Generating resume from form data:', data);
    // TODO: Implement form data processing logic
    alert('Generating your AI-powered resume! 🚀');
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

    <div 
      className={`min-h-screen transition-colors duration-300 `}
    >
      {/* <Header isDark={isDark} setIsDark={setIsDark} /> */}
      <HeroSection isDark={isDark} />
      <TabSelector 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
      />
      
      <div className="container mx-auto px-6 ">
        {activeTab === 'upload' ? (
          <UploadTab 
            isDark={isDark} 
            onGenerate={handleGenerateFromFile} 
          />
        ) : (
          <ManualTab 
            isDark={isDark} 
            onGenerate={handleGenerateFromForm} 
          />
        )}
      </div>
    </div>
    </>
    
  );
}

