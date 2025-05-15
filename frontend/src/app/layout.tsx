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
        'bg-gray-950 text-white',
        'relative overflow-x-hidden',
        'before:fixed before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-gray-900 before:to-gray-950 before:content-[""]'
      )}>
        {/* Glowing Lines */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-30" />
        <div className="fixed top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-30" />
        
        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            <div className="relative bg-gray-950 rounded-lg border border-gray-800 shadow-lg shadow-black/20">
              {children}
            </div>
          </div>
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}
