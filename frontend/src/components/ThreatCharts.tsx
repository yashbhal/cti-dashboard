'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { DonutChart, BarChart } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { AlertCircle } from 'lucide-react';

interface ThreatChartsProps {
  threats: ThreatIndicator[];
}

export default function ThreatCharts({ threats = [] }: ThreatChartsProps) {
  if (!threats?.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <AlertCircle className="h-10 w-10 mb-4" />
            <p>No threat data available</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <AlertCircle className="h-10 w-10 mb-4" />
            <p>No threat data available</p>
          </div>
        </Card>
      </div>
    );
  }

  // Calculate type distribution
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

  // Calculate severity distribution
  const severityDistribution = threats.reduce((acc, threat) => {
    acc[threat.severity] = (acc[threat.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severityData = Object.entries(severityDistribution)
    .map(([name, value]) => ({
      name,
      'Number of Threats': value
    }))
    .sort((a, b) => {
      const order = ['Critical', 'High', 'Medium', 'Low'];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-6">Threat Types Distribution</h3>
          <div className="h-64">
            <DonutChart
              data={typeData}
              category="value"
              index="name"
              valueFormatter={(value) => `${value.toString()} threats`}
              colors={[
                'slate',
                'violet',
                'indigo',
                'rose',
                'cyan',
                'amber'
              ]}
              showAnimation={true}
              className="h-full"
            />
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-6">Threats by Severity</h3>
          <div className="h-64">
            <BarChart
              data={severityData}
              index="name"
              categories={['Number of Threats']}
              colors={['rose']}
              valueFormatter={(value) => `${value.toString()} threats`}
              showAnimation={true}
              className="h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
