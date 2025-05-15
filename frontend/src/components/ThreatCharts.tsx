'use client';

import React from 'react';
import { Card, DonutChart, BarChart, Title, Text, Legend, Grid } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { AlertCircle } from 'lucide-react';

// Cyberpunk color palette
const colors = {
  neonGreen: '#00ff9d',
  neonPink: '#ff00ff',
  neonBlue: '#00ffff',
  neonPurple: '#bd00ff',
  neonYellow: '#ffff00',
  neonRed: '#ff0033',
  neonOrange: '#ff3300',
  darkPurple: '#1a0033',
  // Chart background colors
  bgPurple: '#2d1f3f',
  bgBlue: '#1f2d3f',
  bgDark: '#131313',
};

// Custom color map for severity levels
const severityColors = {
  'Critical': colors.neonRed,
  'High': colors.neonOrange,
  'Medium': colors.neonBlue,
  'Low': colors.neonGreen
};

// Custom color map for threat types
const typeColors = [
  colors.neonGreen,
  colors.neonPink,
  colors.neonBlue,
  colors.neonPurple,
  colors.neonYellow
];

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

  // Calculate type distribution with color mapping
  const typeDistribution = threats.reduce((acc, threat) => {
    acc[threat.type] = (acc[threat.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeDistribution)
    .map(([name, value]) => ({
      name,
      value
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate severity distribution with consistent ordering
  const severityDistribution = threats.reduce((acc, threat) => {
    acc[threat.severity] = (acc[threat.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severityOrder = ['Critical', 'High', 'Medium', 'Low'];
  
  // Ensure all severity levels are represented even if count is 0
  const severityData = severityOrder.map(severity => {
    // Define color mapping for severity levels
    const colorMap: Record<string, string> = {
      'Critical': '#ef4444', // red-500
      'High': '#f97316',     // orange-500
      'Medium': '#3b82f6',   // blue-500
      'Low': '#22c55e'       // green-500
    };
    
    return {
      name: severity,
      'Number of Threats': severityDistribution[severity] || 0,
      color: colorMap[severity] || '#8b5cf6' // Default to indigo if not found
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[#131313]/90 backdrop-blur-sm border border-[#00ff9d]/20 shadow-lg shadow-[#00ff9d]/5 p-6 relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00ff9d]/5 before:to-transparent before:opacity-50 before:blur-xl
        hover:border-[#00ff9d]/40 hover:shadow-[#00ff9d]/10 transition-all duration-300 ease-in-out
        after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-[#00ff9d]/5 after:to-transparent after:opacity-0 after:hover:opacity-100 after:transition-opacity after:duration-300">
        <div className="flex flex-col space-y-2">
          <Title className="text-xl font-mono font-bold bg-gradient-to-r from-[#00ff9d] to-[#00ffff] text-transparent bg-clip-text tracking-tight">Threat Types Distribution</Title>
          <Text className="text-sm text-[#00ff9d]/70 font-mono tracking-wide">
            Overview of different types of threats detected in the system
          </Text>
        </div>
        <div className="mt-6">
          <Legend
            categories={typeData.map(item => item.name)}
            colors={typeColors}
            className="mb-6 text-white/90 font-mono text-sm"
          />
          <div className="rounded-lg bg-[#2d1f3f] p-4">
            <DonutChart
              data={typeData}
              category="value"
              index="name"
              valueFormatter={(value) => `${value.toString()} threats`}
              colors={typeColors}
              className="h-[300px] mt-4"
              showAnimation={true}
              animationDuration={1000}
              label="Total Threats"
              variant="donut"
              showTooltip={true}
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
      </Card>
      
      <Card className="bg-[#131313]/90 backdrop-blur-sm border border-[#00ff9d]/20 shadow-lg shadow-[#00ff9d]/5 p-6 relative overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00ff9d]/5 before:to-transparent before:opacity-50 before:blur-xl
        hover:border-[#00ff9d]/40 hover:shadow-[#00ff9d]/10 transition-all duration-300 ease-in-out
        after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-[#00ff9d]/5 after:to-transparent after:opacity-0 after:hover:opacity-100 after:transition-opacity after:duration-300">
        <div className="flex flex-col space-y-2">
          <Title className="text-xl font-mono font-bold bg-gradient-to-r from-[#00ff9d] to-[#00ffff] text-transparent bg-clip-text tracking-tight">Threats by Severity</Title>
          <Text className="text-sm text-[#00ff9d]/70 font-mono tracking-wide">
            Distribution of threats based on their severity level
          </Text>
        </div>
        <div className="mt-6">
          <Legend
            categories={severityOrder}
            colors={severityOrder.map(severity => severityColors[severity as keyof typeof severityColors])}
            className="mb-6"
          />
          <div className="rounded-lg bg-[#1f2d3f] p-4">
            <BarChart
              data={severityData}
              index="name"
              categories={['Number of Threats']}
              colors={severityOrder.map(severity => severityColors[severity as keyof typeof severityColors])}
              valueFormatter={(value) => `${value.toString()} threats`}
              className="h-[300px] mt-4"
              showAnimation={true}
              animationDuration={1000}
              showLegend={true}
              showGridLines={false}
              startEndOnly={false}
              showXAxis={true}
              showYAxis={true}
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
