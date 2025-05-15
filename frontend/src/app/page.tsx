'use client';

import { mockThreats } from '@/data/mockThreats';
import ThreatCharts from '@/components/ThreatCharts';
import ThreatTable from '@/components/ThreatTable';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen space-y-8 p-6 relative overflow-hidden bg-[#0a0a0f]">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative space-y-4"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/20">
            <div className="w-full h-full rounded-[10px] bg-black/90 flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              CTI Dashboard
            </h1>
            <p className="text-sm text-purple-300/80">Real-time Threat Intelligence</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Active Threats', value: mockThreats.length, color: 'from-red-500 to-red-900' },
          { label: 'Critical Severity', value: mockThreats.filter(t => t.severity === 'Critical').length, color: 'from-orange-500 to-orange-900' },
          { label: 'Resolved Today', value: '12', color: 'from-green-500 to-green-900' },
          { label: 'Total Sources', value: '8', color: 'from-blue-500 to-blue-900' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
            className={`p-4 rounded-lg bg-gradient-to-br ${stat.color} border border-white/10 shadow-lg backdrop-blur-sm`}
          >
            <p className="text-sm text-white/80">{stat.label}</p>
            <p className="text-3xl font-mono font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ThreatCharts threats={mockThreats} />
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden"
      >
        <ThreatTable threats={mockThreats} />
      </motion.div>
    </main>
  );
}
