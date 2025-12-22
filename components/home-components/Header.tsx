'use client';

import { Sparkles, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-700/60 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className={isDark ? 'w-8 h-8 text-indigo-400' : 'w-8 h-8 text-indigo-600'} />
          <h1 className="text-2xl font-bold text-foreground dark:text-white">
            AI Resume Maker
          </h1>
        </div>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className={isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button> */}
      </div>
    </header>
  );
}