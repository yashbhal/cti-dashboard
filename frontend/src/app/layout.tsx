import './globals.css';
import './animations.css';
import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'CTI Dashboard',
  description: 'Cyber Threat Intelligence Dashboard',
  icons: {
    icon: '/favicon.ico',
  },
  authors: [
    {
      name: "CTI Dashboard Team",
    },
  ],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#09090b" }],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head />
      <body className={cn(
        'min-h-screen antialiased custom-scrollbar',
        'bg-gray-950 text-white',
        'relative overflow-x-hidden',
        'animated-gradient'
      )}>
        {/* Subtle background elements */}
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
        <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        
        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            <div className="relative bg-gray-950/80 backdrop-blur-sm rounded-lg border border-gray-800/80 shadow-lg shadow-black/20 overflow-hidden">
              {/* Subtle corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/5 rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/5 rounded-tl-full" />
              
              {children}
            </div>
          </div>
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}
