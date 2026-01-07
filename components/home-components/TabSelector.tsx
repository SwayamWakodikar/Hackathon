'use client';

import { Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabSelectorProps {
  activeTab: 'upload' | 'manual';
  setActiveTab: (tab: 'upload' | 'manual') => void;
  isDark: boolean;
}

export default function TabSelector({ 
  activeTab, 
  setActiveTab, 
  isDark 
}: TabSelectorProps) {
  return (
    <div className="container mx-auto px-6 mb-8">
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setActiveTab('upload')}
          variant={activeTab === 'upload' ? 'default' : 'outline'}
          size="lg"
          className={`flex items-center gap-2 ${
            activeTab === 'upload' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
              : 'border-blue-600! text-blue-600! hover:bg-blue-50! bg-transparent!'
          }`}
        >
          <Upload className="w-5 h-5" />
          Upload Resume
        </Button>
        <Button
          onClick={() => setActiveTab('manual')}
          variant={activeTab === 'manual' ? 'default' : 'outline'}
          size="lg"
          className={`flex items-center gap-2 ${
            activeTab === 'manual' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
              : 'border-blue-600! text-blue-600! hover:bg-blue-50! bg-transparent!'
          }`}
        >
          <FileText className="w-5 h-5" />
          Fill Details
        </Button>
      </div>
    </div>
  );
}