import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <main className="flex-1 py-6 md:py-8">
        <div className="space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}

interface DashboardHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function DashboardHeader({ 
  title, 
  description, 
  className 
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center text-center space-y-3 mb-8", className)}>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 pb-1">
        {title}
      </h1>
      {description && (
        <p className="text-gray-400 max-w-2xl text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

interface DashboardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardSection({ children, className }: DashboardSectionProps) {
  return (
    <div className={cn("grid gap-6 md:gap-8", className)}>
      {children}
    </div>
  );
}
