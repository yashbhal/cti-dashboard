'use client';

import { useState, useEffect } from 'react';
import { fetchThreats } from '@/lib/api';
import { mockThreats } from '@/data/mockThreats';
import ThreatCharts from '@/components/ThreatCharts';
import ThreatTable from '@/components/ThreatTable';
import { DashboardHeader } from '@/components/ui/dashboard-layout';
import { motion } from 'framer-motion';
import { ThreatIndicator } from '@/types/threat';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui';

export default function Home() {
  const [threats, setThreats] = useState<ThreatIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<number>(7); // Default to 7 days

  useEffect(() => {
    async function loadThreats() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchThreats(timeframe);
        setThreats(data);
      } catch (err) {
        console.error('Failed to fetch threats:', err);
        setError('Failed to load threat data. Using mock data instead.');
        // Fallback to mock data if API fails
        setThreats(mockThreats);
      } finally {
        setLoading(false);
      }
    }

    loadThreats();
  }, [timeframe]);

  return (
    <main className="min-h-screen space-y-8 p-4 md:p-6 bg-gray-950 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative space-y-4 w-full text-center"
      >
        <DashboardHeader 
          title="Cyber Threat Intelligence" 
          description="Real-time insights into active cyber threats and indicators of compromise"
        />
        {error && (
          <div className="bg-rose-500/20 border border-rose-500/50 text-white px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 h-[350px]">
              <Skeleton className="h-8 w-64 bg-gray-800 mb-6" />
              <div className="flex items-center justify-center h-[250px]">
                <div className="h-48 w-48 rounded-full bg-gray-800 animate-pulse" />
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 h-[350px]">
              <Skeleton className="h-8 w-64 bg-gray-800 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
              </div>
            </Card>
          </div>
        ) : (
          <ThreatCharts threats={threats} />
        )}
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="rounded-xl bg-gray-900 border-gray-800 shadow-md shadow-black/10 overflow-hidden w-full"
      >
        {loading ? (
          <div className="p-6 space-y-6">
            <Skeleton className="h-8 w-64 bg-gray-800" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
              <Skeleton className="h-12 w-full bg-gray-800" />
            </div>
          </div>
        ) : (
          <ThreatTable threats={threats} />
        )}
      </motion.div>
    </main>
  );
}
