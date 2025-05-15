'use client';

import { useState, useEffect } from 'react';
import { fetchThreats } from '@/lib/api';
import { mockThreats } from '@/data/mockThreats';
import ThreatCharts from '@/components/ThreatCharts';
import ThreatTable from '@/components/ThreatTable';
import { DashboardHeader } from '@/components/ui/dashboard-layout';
import { DashboardFooter } from '@/components/ui/dashboard-footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreatIndicator } from '@/types/threat';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui';
import { RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [threats, setThreats] = useState<ThreatIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<number>(7); // Default to 7 days

  const loadThreats = async () => {
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
  };

  useEffect(() => {
    loadThreats();
  }, [timeframe]);

  return (
    <main className="min-h-screen space-y-8 p-4 md:p-6 bg-gray-950 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl -z-10 animate-pulse" />
      
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
        
        {/* Timeframe Selector */}
        <motion.div 
          className="flex justify-center items-center gap-2 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Clock className="h-4 w-4 text-indigo-400" />
          <div className="text-sm text-gray-400">Timeframe:</div>
          <div className="flex gap-1">
            {[7, 14, 30].map((days) => (
              <Button 
                key={days}
                variant={timeframe === days ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(days)}
                className={`text-xs px-3 py-1 h-auto ${timeframe === days ? 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30' : 'text-gray-400 hover:text-white'}`}
              >
                {days} days
              </Button>
            ))}
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-xs px-2 py-1 h-auto text-indigo-400 hover:text-indigo-300"
            onClick={() => {
              setLoading(true);
              setTimeout(() => loadThreats(), 300);
            }}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </motion.div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-rose-500/20 border border-rose-500/50 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 max-w-md mx-auto"
            >
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading-charts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 h-[350px] card-hover subtle-glow">
                <Skeleton className="h-8 w-64 bg-gray-800 mb-6" />
                <div className="flex items-center justify-center h-[250px]">
                  <div className="h-48 w-48 rounded-full bg-gray-800 animate-pulse" />
                </div>
              </Card>
              <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 h-[350px] card-hover subtle-glow">
                <Skeleton className="h-8 w-64 bg-gray-800 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full bg-gray-800" />
                  <Skeleton className="h-12 w-full bg-gray-800" />
                  <Skeleton className="h-12 w-full bg-gray-800" />
                  <Skeleton className="h-12 w-full bg-gray-800" />
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="loaded-charts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThreatCharts threats={threats} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading-table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl bg-gray-900 border-gray-800 shadow-md shadow-black/10 overflow-hidden w-full p-6 space-y-6 card-hover subtle-glow"
            >
              <Skeleton className="h-8 w-64 bg-gray-800" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
                <Skeleton className="h-12 w-full bg-gray-800" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loaded-table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThreatTable threats={threats} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Footer */}
      <DashboardFooter />
    </main>
  );
}
