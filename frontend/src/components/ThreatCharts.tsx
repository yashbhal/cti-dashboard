'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text, DonutChart, BarChart, Legend, Color } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { AlertCircle } from 'lucide-react';

// Cyberpunk color palette
const colors = {
  // Chart colors
  chartPink: '#ff1493',
  chartCyan: '#00ffff',
  chartGreen: '#39ff14',
  chartPurple: '#9400ff',
  chartOrange: '#ff6b00',
  
  // Severity colors
  severityRed: '#ff1744',
  severityOrange: '#ff9100',
  severityYellow: '#ffea00',
  severityGreen: '#00ff55',
  
  // UI accent colors
  accentNeonGreen: '#00ff9d',
  accentBlue: '#00b8ff',
  
  // Chart background colors
  bgPurple: '#2d1f3f',
  bgBlue: '#1f2d3f',
  bgDark: '#131313',
};

// Custom color map for severity levels
const severityColors = {
  'Critical': colors.severityRed,
  'High': colors.severityOrange,
  'Medium': colors.severityYellow,
  'Low': colors.severityGreen
};

// Custom color map for threat types
const typeColorsMap: Record<string, string> = {
  domain: "blue",
  ipv4: "teal",
  url: "amber",
  hash: "violet",
  email: "lime",
  // fallback for others
  default: "cyan"
};
// For Legend and DonutChart, map type order to color
const typeColors = (typeData: { name: string }[]) =>
  typeData.map(item => typeColorsMap[item.name.toLowerCase()] || typeColorsMap.default);

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
        value
      }))
      .sort((a, b) => b.value - a.value);
  }, [threats]);

  const severityData = React.useMemo(() => {
    const severityCounts = threats.reduce((acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return severityOrder.map(severity => ({
      name: severity,
      'Number of Threats': severityCounts[severity] || 0
    }));
  }, [threats]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#131313]/90 backdrop-blur-sm border border-[#00ff9d]/20 shadow-lg shadow-[#00ff9d]/5 p-6 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00ff9d]/5 before:to-transparent before:opacity-50 before:blur-xl hover:border-[#00ff9d]/40 hover:shadow-[#00ff9d]/10 transition-all duration-300 ease-in-out after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-[#00ff9d]/5 after:to-transparent after:opacity-0 after:hover:opacity-100 after:transition-opacity after:duration-300">
          <div className="flex flex-col space-y-2">
            <Title className="text-xl font-mono font-bold bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-lime-300 text-transparent bg-clip-text tracking-tight drop-shadow-[0_0_8px_#00fff7] animate-pulse">Threat Types Distribution</Title>
            <Text className="text-sm text-[#00ff9d]/70 font-mono tracking-wide">
              Overview of different types of threats detected in the system
            </Text>
          </div>
          <div className="mt-6">
            <Legend
              categories={typeData.map(item => item.name)}
              colors={typeColors(typeData)}
              className="mb-6 font-mono text-base tracking-wide text-white drop-shadow-[0_0_5px_#00fff7]"
            />
            <div className="rounded-lg bg-[#2d1f3f]/90 p-4 ring-1 ring-purple-500/30 shadow-lg shadow-purple-500/20">
              <div className="text-white/70 mb-4 font-mono text-sm">Distribution of different threat types detected</div>
              <div className="[&_*]:!text-white [&_path]:!stroke-white/10">
                <DonutChart
                  data={typeData}
                  category="value"
                  index="name"
                  valueFormatter={(value) => `${value.toString()} threats`}
                  colors={typeColors(typeData)}
                  className="h-[300px] mt-4 [&_.recharts-label]:!fill-white [&_.recharts-label]:!font-bold [&_.recharts-label]:!drop-shadow-[0_0_4px_#00fff7]"
                  showAnimation={true}
                  animationDuration={1000}
                  label="Total Threats"
                  variant="donut"
                  showTooltip={true}
                  onValueChange={(v) => console.log(v)}
                  customTooltip={({ payload }) => (
                    <div className="p-2 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl">
                      <div className="text-white font-mono font-bold drop-shadow-[0_0_4px_#00fff7]">
                        {payload?.[0]?.payload?.name}: {payload?.[0]?.value} threats
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-[#131313]/90 backdrop-blur-sm border border-[#00ff9d]/20 shadow-lg shadow-[#00ff9d]/5 p-6 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00ff9d]/5 before:to-transparent before:opacity-50 before:blur-xl hover:border-[#00ff9d]/40 hover:shadow-[#00ff9d]/10 transition-all duration-300 ease-in-out after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-[#00ff9d]/5 after:to-transparent after:opacity-0 after:hover:opacity-100 after:transition-opacity after:duration-300">
          <div className="flex flex-col space-y-2">
            <Title className="text-xl font-mono font-bold bg-gradient-to-r from-fuchsia-300 via-cyan-400 to-lime-300 text-transparent bg-clip-text tracking-tight drop-shadow-[0_0_6px_#ff00ea] animate-pulse">Threats by Severity</Title>
            <Text className="text-sm text-[#00ff9d]/70 font-mono tracking-wide">
              Distribution of threats based on their severity level
            </Text>
          </div>
          <div className="mt-6">
            <Legend
              categories={severityOrder}
              colors={["fuchsia", "cyan", "lime", "violet"]}
              className="mb-6 font-mono text-sm tracking-wide bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-lime-400 text-transparent bg-clip-text drop-shadow-[0_0_6px_#ff00ea]"
            />
            <div className="rounded-lg bg-[#1f2d3f]/90 p-4 ring-1 ring-blue-500/30 shadow-lg shadow-blue-500/20">
              <div className="text-white/70 mb-4 font-mono text-sm">Number of threats by severity level</div>
              <div className="[&_*]:!text-white [&_path]:!stroke-white/10">
                <BarChart
                  data={severityData}
                  index="name"
                  categories={['Number of Threats']}
                  colors={["fuchsia", "cyan", "lime", "violet"]}
                  valueFormatter={(value) => `${value.toString()} threats`}
                  className="h-[300px] mt-4 [&_.recharts-label]:!fill-white [&_.recharts-label]:!font-bold [&_.recharts-label]:!drop-shadow-[0_0_4px_#00fff7]"
                  showAnimation={true}
                  animationDuration={1000}
                  showLegend={true}
                  showGridLines={false}
                  startEndOnly={false}
                  showXAxis={true}
                  showYAxis={true}
                  yAxisWidth={48}
                  onValueChange={(v) => console.log(v)}
                  customTooltip={({ payload }) => (
                    <div className="p-2 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-xl">
                      <div className="text-white font-mono font-bold drop-shadow-[0_0_4px_#00fff7]">
                        {payload?.[0]?.payload?.name}: {payload?.[0]?.value} threats
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
