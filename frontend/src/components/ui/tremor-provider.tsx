'use client';

import { ReactNode } from 'react';
import { Card } from '@tremor/react';

interface TremorProviderProps {
  children: ReactNode;
}

export function TremorProvider({ children }: TremorProviderProps) {
  return (
    <div className="tremor-base">
      {children}
    </div>
  );
}
