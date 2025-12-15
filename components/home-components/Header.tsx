'use client';

import { Sparkles, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  return (
    <header 
      className={`border-b ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white/80 backdrop-blur-sm border-gray-200'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles 
            className={`w-8 h-8 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} 
          />
          <h1 
            className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            AI Resume Maker
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className={isDark ? 'border-gray-600' : ''}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
    </header>
  );
}