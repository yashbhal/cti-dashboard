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

// Custom color map for threat types
const typeColorsMap: Record<string, string> = {
  domain: "indigo",
  ipv4: "teal",
  url: "blue",
  hash: "violet",
  email: "purple",
  // fallback for others
  default: "gray"
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
      <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 relative overflow-hidden">
        <Title className="text-lg font-medium text-white mb-4">Threat Types Distribution</Title>
        <div className="relative h-[250px]">
          <DonutChart
            data={typeData}
            category="count"
            index="name"
            colors={Object.values(typeColorsMap) as Color[]}
            className="h-full w-full text-white"
            showAnimation
            animationDuration={800}
            noDataText="No data available"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs text-gray-400 bg-gray-800/80 px-2 py-1 rounded-md border border-gray-700/50">
              Total: {threats.length}
            </span>
          </div>
        </div>
        <Legend
          categories={typeData.map(d => d.name)}
          colors={typeData.map(d => typeColorsMap[d.name.toLowerCase()] || typeColorsMap.default) as Color[]}
          className="mt-4 text-gray-300"
        />
      </Card>
      
      {/* Bar Chart for Threat Severity */}
      <Card className="bg-gray-900 border-gray-800 shadow-md shadow-black/10 p-6 relative overflow-hidden">
        <Title className="text-lg font-medium text-white mb-4">Threat Severity Levels</Title>
        <div className="relative h-[250px]">
          <BarChart
            data={severityData}
            index="severity"
            categories={severityOrder}
            colors={['rose', 'amber', 'yellow', 'emerald'] as Color[]}
            valueFormatter={(value) => value.toString()}
            yAxisWidth={40}
            className="h-full text-white"
            showAnimation
            animationDuration={800}
            noDataText="No data available"
          />
        </div>
        <Legend
          categories={severityOrder}
          colors={['rose', 'amber', 'yellow', 'emerald'] as Color[]}
          className="mt-4 text-gray-300"
        />
        <Text className="mt-2 text-gray-400 text-sm">Higher severity indicates greater potential impact</Text>
      </Card>
    </div>
  );
}
