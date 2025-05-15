import './globals.css';
import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body className={cn(
        inter.className,
        'min-h-screen bg-gray-950 text-white antialiased'
      )}>
        <div className="relative flex min-h-screen flex-col">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
