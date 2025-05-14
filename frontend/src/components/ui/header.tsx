'use client';

import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold">CTI Dashboard</span>
        </div>
      </div>
    </header>
  );
}
