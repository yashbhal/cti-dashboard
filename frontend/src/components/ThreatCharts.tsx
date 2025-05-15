'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text, DonutChart, BarChart, Legend, Color } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Updated color palette for a professional look
const colors = {
  // Chart colors
  chartPurple: '#8b5cf6',
  chartTeal: '#2dd4bf',
  chartBlue: '#3b82f6',
  chartIndigo: '#6366f1',
  chartViolet: '#a855f7',
  
  // Severity colors
  severityCritical: '#ef4444', // Red for Critical
  severityHigh: '#f59e0b', // Orange for High
  severityMedium: '#eab308', // Yellow for Medium
  severityLow: '#10b981', // Green for Low
  
  // UI accent colors
  accentIndigo: '#4f46e5',
  accentPurple: '#7c3aed',
  
  // Chart background colors
  bgDark: '#111827',
  bgCharcoal: '#1f2937',
};

// Custom color map for severity levels - using Tremor color names
const severityColors: Record<string, Color> = {
  'Critical': 'rose',
  'High': 'amber',
  'Medium': 'yellow',
  'Low': 'emerald'
};

// Custom color map for threat types - updated based on API data
const typeColorsMap: Record<string, Color> = {
  domain: "indigo",
  IPv4: "cyan",
  URL: "blue",
  email: "purple",
  hostname: "violet",
  "FileHash-MD5": "amber",
  "FileHash-SHA256": "orange",
  CVE: "rose",
  // fallback for others
  default: "slate"
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface ThreatChartsProps {
  threats: ThreatIndicator[];
  className?: string;
}

export default function ThreatCharts({ threats = [], className }: ThreatChartsProps) {
  if (!threats?.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="dark:bg-gray-900">
          <Title className="text-lg font-medium mb-4">Threat Types Distribution</Title>
          <div className="flex flex-col items-center justify-center h-[250px] text-gray-400">
            <AlertCircle className="h-8 w-8 text-gray-400 mb-4" />
            <p className="text-sm">No threat data available</p>
          </div>
        </Card>
        <Card className="dark:bg-gray-900">
          <Title className="text-lg font-medium mb-4">Threats by Severity</Title>
          <div className="flex flex-col items-center justify-center h-[250px] text-gray-400">
            <AlertCircle className="h-8 w-8 text-gray-400 mb-4" />
            <p className="text-sm">No threat data available</p>
          </div>
        </Card>
      </div>
    );
  }

  const severityOrder = ['Critical', 'High', 'Medium', 'Low'];

  // Process threat data for charts
  const typeData = React.useMemo(() => {
    const typeCounts = threats.reduce((acc, threat) => {
      acc[threat.type] = (acc[threat.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts)
      .map(([name, value]) => ({
        name,
        count: value
      }))
      .sort((a, b) => b.count - a.count);
  }, [threats]);

  const severityData = React.useMemo(() => {
    const severityCounts = threats.reduce((acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Create a data structure that works better with Tremor's BarChart
    return severityOrder.map(severity => {
      // Create an object with the severity as the key and the count as the value
      // This allows us to use the severity name as both the index and the category
      return {
        severity,
        [severity]: severityCounts[severity] || 0
      };
    });
  }, [threats]);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {/* Donut Chart for Threat Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 relative overflow-hidden card-hover subtle-glow">
          <div className="flex flex-col space-y-1">
            <Title className="text-lg font-medium text-white text-glow">Threat Types Distribution</Title>
            <Text className="text-xs text-gray-400">Breakdown of threat indicators by type</Text>
          </div>
          
          <div className="relative h-[250px] mt-4">
            <DonutChart
              data={typeData}
              category="count"
              index="name"
              colors={typeData.map(d => typeColorsMap[d.name] || typeColorsMap.default)}
              className="h-full w-full text-white"
              showAnimation
              animationDuration={1200}
              valueFormatter={(value) => `${value} (${((value / threats.length) * 100).toFixed(1)}%)`}
              noDataText="No data available"
            />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-xs text-gray-300 bg-gray-800/80 px-3 py-1.5 rounded-md border border-indigo-500/20 shadow-sm shadow-indigo-500/10">
                Total: {threats.length}
              </span>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-4 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Legend
              categories={typeData.map(d => `${d.name} (${d.count})`)}
              colors={typeData.map(d => typeColorsMap[d.name] || typeColorsMap.default)}
              className="text-gray-300 text-sm"
            />
          </motion.div>
        </Card>
      </motion.div>
      
      {/* Threat Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 relative overflow-hidden card-hover subtle-glow">
          <div className="flex flex-col space-y-1">
            <Title className="text-lg font-medium text-white text-glow">Threat Intelligence Summary</Title>
            <Text className="text-xs text-gray-400">Key metrics and severity breakdown</Text>
          </div>
          
          {/* Threat Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <motion.div 
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 flex flex-col items-center justify-center hover:border-indigo-500/30 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-3xl font-bold text-white">{threats.length}</div>
              <div className="text-sm text-gray-400 mt-1">Total Indicators</div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 flex flex-col items-center justify-center hover:border-indigo-500/30 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-3xl font-bold text-white">{typeData.length}</div>
              <div className="text-sm text-gray-400 mt-1">Unique Types</div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 flex flex-col items-center justify-center hover:border-emerald-500/30 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-3xl font-bold text-emerald-400">
                {severityData.find(d => d.severity === 'Low')?.["Low"] || 0}
              </div>
              <div className="text-sm text-gray-400 mt-1">Low Severity</div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 flex flex-col items-center justify-center hover:border-amber-500/30 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ y: -2 }}
            >
              <div className="text-3xl font-bold text-amber-400">
                {severityData.find(d => d.severity === 'Medium')?.["Medium"] || 0}
              </div>
              <div className="text-sm text-gray-400 mt-1">Medium Severity</div>
            </motion.div>
          </div>
          
          {/* Top Threat Types */}
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Text className="text-sm font-medium text-white mb-3">Top Threat Types</Text>
            <div className="space-y-2">
              {typeData.slice(0, 4).map((type, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-800/50 transition-colors duration-200"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2 status-pulse" 
                      style={{ backgroundColor: `var(--tremor-${typeColorsMap[type.name] || typeColorsMap.default}-500)` }}
                    />
                    <Text className="text-sm text-gray-300">{type.name}</Text>
                  </div>
                  <Text className="text-sm text-gray-400">{type.count}</Text>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Text className="mt-6 text-gray-400 text-xs refresh-pulse">Data refreshed: {new Date().toLocaleString()}</Text>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
