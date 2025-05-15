'use client';

import { mockThreats } from '@/data/mockThreats';
import ThreatCharts from '@/components/ThreatCharts';
import ThreatTable from '@/components/ThreatTable';
import { DashboardHeader } from '@/components/ui/dashboard-layout';
import { motion } from 'framer-motion';

export default function Home() {
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
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
        <ThreatCharts threats={mockThreats} />
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="rounded-xl bg-gray-900 border-gray-800 shadow-md shadow-black/10 overflow-hidden w-full"
      >
        <ThreatTable threats={mockThreats} />
      </motion.div>
    </main>
  );
}
