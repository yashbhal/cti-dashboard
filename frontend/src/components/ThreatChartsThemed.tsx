'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DonutChart, BarChart, Legend } from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent 
} from '@/components/ui';

interface ThreatChartsProps {
  threats: ThreatIndicator[];
  className?: string;
}

export default function ThreatCharts({ threats = [], className }: ThreatChartsProps) {
  // Define colors for different threat types - use CSS variables for theming
  const typeColorsMap: Record<string, string> = {
    'domain': 'var(--chart-color-1)',
    'IPv4': 'var(--chart-color-3)',
    'URL': 'var(--chart-color-4)',
    'email': 'var(--chart-color-2)',
    'hostname': 'var(--chart-color-6)',
    'FileHash-MD5': 'var(--chart-color-5)',
    'FileHash-SHA256': 'var(--chart-color-5)',
    'CVE': 'var(--critical)',
    'default': 'var(--text-muted)'
  };

  if (!threats?.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-bg overflow-hidden card-hover subtle-glow">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-primary text-glow">
              Threat Type Distribution
            </CardTitle>
            <CardDescription className="text-secondary">
              Breakdown of threat indicators by type
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <AlertCircle className="h-8 w-8 text-muted mb-4" />
                <p className="text-sm text-muted">No threat data available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-bg overflow-hidden card-hover subtle-glow">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-primary text-glow">
              Threat Summary
            </CardTitle>
            <CardDescription className="text-secondary">
              Overview of detected threat indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-[300px]">
              <div className="flex flex-col items-center justify-center">
                <AlertCircle className="h-8 w-8 text-muted mb-4" />
                <p className="text-sm text-muted">No threat data available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Process threat data for charts
  const typeData = React.useMemo(() => {
    const typeCounts: Record<string, number> = {};
    threats.forEach(threat => {
      const type = threat.type || 'unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    return Object.entries(typeCounts).map(([name, count]) => ({ name, count }));
  }, [threats]);

  // Process severity data for charts
  const severityData = React.useMemo(() => {
    const severityCounts: Record<string, number> = {
      'Critical': 0,
      'High': 0,
      'Medium': 0,
      'Low': 0
    };
    
    threats.forEach(threat => {
      const severity = threat.severity || 'Low';
      severityCounts[severity] = (severityCounts[severity] || 0) + 1;
    });
    
    return Object.entries(severityCounts).map(([name, count]) => ({ 
      name, 
      count,
      [name]: count // For the bar chart
    }));
  }, [threats]);

  const totalThreats = threats.length;
  const uniqueTypes = typeData.length;
  const severityCounts = severityData.reduce((acc, curr) => {
    acc[curr.name] = curr.count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Threat Type Distribution */}
      <Card className="card-bg overflow-hidden card-hover subtle-glow">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-primary text-glow">
            Threat Type Distribution
          </CardTitle>
          <CardDescription className="text-secondary">
            Breakdown of threat indicators by type
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] flex items-center justify-center">
            <div className="w-full max-w-xs">
              <DonutChart
                data={typeData}
                category="count"
                index="name"
                colors={typeData.map(d => typeColorsMap[d.name] || typeColorsMap.default)}
                valueFormatter={(value) => `${value} (${((value / totalThreats) * 100).toFixed(1)}%)`}
                showAnimation={true}
                animationDuration={1000}
                className="h-[200px] mt-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Threat Summary */}
      <Card className="card-bg overflow-hidden card-hover subtle-glow">
        <CardHeader>
          <CardTitle className="text-xl font-medium text-primary text-glow">
            Threat Summary
          </CardTitle>
          <CardDescription className="text-secondary">
            Overview of detected threat indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Indicators */}
            <motion.div 
              className="bg-primary/5 rounded-lg p-4 border border-primary/20 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{totalThreats}</div>
              <div className="text-sm text-secondary">Total Indicators</div>
            </motion.div>
            
            {/* Unique Types */}
            <motion.div 
              className="bg-secondary/5 rounded-lg p-4 border border-secondary/20 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-3xl font-bold text-secondary mb-2">{uniqueTypes}</div>
              <div className="text-sm text-secondary">Unique Types</div>
            </motion.div>
            
            {/* Severity Breakdown */}
            <motion.div 
              className="bg-primary/5 rounded-lg p-4 border border-primary/20 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-1 mb-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: 'var(--critical)'}}></span>
                <span className="text-sm text-secondary">{severityCounts.Critical || 0} Critical</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: 'var(--high)'}}></span>
                <span className="text-sm text-secondary">{severityCounts.High || 0} High</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full" style={{backgroundColor: 'var(--low)'}}></span>
                <span className="text-sm text-secondary">
                  {(severityCounts.Medium || 0) + (severityCounts.Low || 0)} Med/Low
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Severity Bar Chart */}
          <div className="mt-6">
            <div className="text-sm font-medium text-secondary mb-2">Severity Distribution</div>
            <BarChart
              data={severityData}
              index="name"
              categories={["count"]}
              colors={["var(--chart-color-1)"]}
              showAnimation={true}
              animationDuration={1000}
              className="h-[150px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
