'use client';

import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps = {}) {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/80 transition-all",
      className
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <div className="rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 p-1.5 shadow-md shadow-indigo-500/20">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">CTI Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md border border-gray-700">
            v1.0
          </span>
        </div>
      </div>
    </header>
  );
}
