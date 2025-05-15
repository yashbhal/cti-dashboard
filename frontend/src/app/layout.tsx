import './globals.css';
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
        'min-h-screen antialiased',
        'bg-[#0a0a0f] text-[#00ff9d]',
        'relative overflow-x-hidden',
        'before:fixed before:left-0 before:top-0 before:h-full before:w-full before:bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.05),rgba(17,17,25,0.9))] before:content-[""]'
      )}>
        {/* Cyberpunk Grid Effect */}
        <div className="fixed inset-0 bg-[linear-gradient(transparent_1px,#0a0a0f_1px),linear-gradient(90deg,transparent_1px,#0a0a0f_1px)] bg-[size:30px_30px] [background-position:center] opacity-20 pointer-events-none" />
        
        {/* Glowing Lines */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent opacity-30" />
        <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00ff9d] to-transparent opacity-30" />
        
        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            <div className="relative backdrop-blur-sm bg-black/30 rounded-lg border border-[#00ff9d]/10 shadow-lg shadow-[#00ff9d]/5">
              {children}
            </div>
          </div>
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}
