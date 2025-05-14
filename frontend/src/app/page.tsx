'use client';

import { Header } from '@/components/ui/header';
import ThreatTable from '@/components/ThreatTable';
import ThreatCharts from '@/components/ThreatCharts';
import { mockThreats } from '@/data/mockThreats';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-6 space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Threat Intelligence</h1>
            <p className="text-muted-foreground">Monitor and analyze cyber threats in real-time.</p>
          </div>

          <div className="grid gap-6">
            <ThreatCharts threats={mockThreats} />
            <ThreatTable threats={mockThreats} />
          </div>
        </div>
      </main>
    </div>
  );
}
