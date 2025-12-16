'use client';

import { useState } from 'react';
import Header from '@/components/home-components/Header';
import HeroSection from '@/components/home-components/HeroSection';
import TabSelector from '@/components/home-components/TabSelector';
import UploadTab from '@/components/home-components/Upload';
import ManualTab, { FormData } from '@/components/home-components/ManualTab';

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
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDark 
          ? 'bg-gray-900' 
          : 'bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}
    >
      <Header isDark={isDark} setIsDark={setIsDark} />
      <HeroSection isDark={isDark} />
      <TabSelector 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDark={isDark} 
      />
      
      <div className="container mx-auto px-6 pb-16">
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
  );
}

