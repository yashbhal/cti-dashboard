import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Shield, Activity } from 'lucide-react';

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
    <div className={cn("flex flex-col items-center text-center space-y-3 mb-8 relative", className)}>
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-16 -left-16 text-indigo-500/5 pointer-events-none select-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Shield className="w-32 h-32" />
      </motion.div>
      
      <motion.div 
        className="absolute -bottom-12 -right-12 text-purple-500/5 pointer-events-none select-none z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <Activity className="w-24 h-24" />
      </motion.div>
      
      {/* Main content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="h-5 w-5 text-indigo-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-text text-glow">
            {title}
          </h1>
        </div>
        
        {description && (
          <motion.p 
            className="text-gray-400 max-w-2xl text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
      
      {/* Decorative line */}
      <motion.div 
        className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '6rem', opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
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
