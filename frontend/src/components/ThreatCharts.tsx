'use client';

import React from 'react';
import { Card, DonutChart, BarChart, Title } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { AlertCircle } from 'lucide-react';

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
      <Card className="dark:bg-gray-900">
        <Title className="text-lg font-medium mb-4">Threat Types Distribution</Title>
        <DonutChart
          data={typeData}
          category="value"
          index="name"
          valueFormatter={(value) => `${value.toString()} threats`}
          colors={[
            'violet',
            'purple',
            'fuchsia',
            'indigo',
            'blue',
            'cyan'
          ]}
          className="h-[300px] mt-4"
        />
      </Card>
      
      <Card className="dark:bg-gray-900">
        <Title className="text-lg font-medium mb-4">Threats by Severity</Title>
        <BarChart
          data={severityData}
          index="name"
          categories={['Number of Threats']}
          colors={['rose', 'orange', 'blue', 'emerald']}
          valueFormatter={(value) => `${value.toString()} threats`}
          className="h-[300px] mt-4"
        />
      </Card>
    </div>
  );
}
