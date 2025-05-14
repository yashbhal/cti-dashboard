'use client';

import { useState, useEffect } from 'react';
import { Card, Title } from '@tremor/react';
import ThreatTable from '@/components/ThreatTable';
import ThreatCharts from '@/components/ThreatCharts';
import { ThreatIndicator } from '@/types/threat';

export default function Home() {
  const [threats, setThreats] = useState<ThreatIndicator[]>([]);

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/threats');
        const data = await response.json();
        setThreats(data);
      } catch (error) {
        console.error('Error fetching threats:', error);
      }
    };

    fetchThreats();
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="mb-6">Cyber Threat Intelligence Dashboard</Title>
      
      <div className="mb-8">
        <ThreatCharts threats={threats} />
      </div>

      <Card>
        <Title>Threat Indicators</Title>
        <ThreatTable threats={threats} />
      </Card>
    </main>
  );
}
