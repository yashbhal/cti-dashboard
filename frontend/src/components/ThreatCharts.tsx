'use client';

import React from 'react';
import { Card, Title, DonutChart, BarChart } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';

interface ThreatChartsProps {
  threats: ThreatIndicator[];
}

export default function ThreatCharts({ threats }: ThreatChartsProps) {
  // Calculate type distribution
  const typeDistribution = threats.reduce((acc, threat) => {
    acc[threat.type] = (acc[threat.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeData = Object.entries(typeDistribution).map(([name, value]) => ({
    name,
    value
  }));

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
        <Title>Threat Types Distribution</Title>
        <DonutChart
          data={typeData}
          category="value"
          index="name"
          valueFormatter={(value) => `${value.toString()} threats`}
          className="mt-6"
        />
      </Card>
      <Card>
        <Title>Threats by Severity</Title>
        <BarChart
          data={severityData}
          index="name"
          categories={['Number of Threats']}
          colors={['blue']}
          valueFormatter={(value) => `${value.toString()} threats`}
          className="mt-6"
        />
      </Card>
    </div>
  );
}
