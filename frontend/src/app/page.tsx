'use client';

import { useState, useEffect } from 'react';
import { mockThreats } from '@/data/mockThreats';

// Import components from centralized UI index
import { 
  Header,
  DashboardLayout, 
  DashboardHeader, 
  DashboardSection,
  DashboardLoadingState
} from '@/components/ui';

// Import main components
import ThreatTable from '@/components/ThreatTable';
import ThreatCharts from '@/components/ThreatCharts';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [threats, setThreats] = useState(mockThreats);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <DashboardLayout>
        {loading ? (
          // Show loading state
          <DashboardLoadingState />
        ) : (
          // Show dashboard content
          <>
            <DashboardHeader 
              title="Threat Intelligence" 
              description="Monitor and analyze cyber threats in real-time with our advanced visualization dashboard."
              className="animate-in fade-in duration-500"
            />
            
            <DashboardSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <ThreatCharts 
                  threats={threats} 
                  className="animate-in fade-in duration-700 slide-in-from-bottom-4 col-span-1 md:col-span-2" 
                />
              </div>
              
              <ThreatTable 
                threats={threats} 
                className="animate-in fade-in duration-700 delay-200 slide-in-from-bottom-4" 
              />
            </DashboardSection>
          </>
        )}
      </DashboardLayout>
    </>
  );
}
