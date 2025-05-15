'use client';

import React, { useState } from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import ShadCN components from centralized index
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Input, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui';
// Imports moved to centralized UI imports above
import { ThreatIndicator } from '@/types/threat';

interface ThreatTableProps {
  threats: ThreatIndicator[];
  className?: string;
}

export default function ThreatTable({ threats = [], className }: ThreatTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  if (!threats?.length) {
    return (
      <Card className={cn("overflow-hidden bg-gray-900 border-gray-800 shadow-md shadow-black/10 w-full", className)}>
        <CardHeader>
          <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
            Recent Threats
          </CardTitle>
          <CardDescription className="text-gray-400">
            Browse and filter recent cyber threat indicators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
            <AlertCircle className="h-8 w-8 mb-4" />
            <p className="text-sm">No threat data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter threats based on search query and selected severity
  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || threat.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getTypeBadgeVariant = (type: string) => {
    const typeMap: Record<string, string> = {
      'domain': 'indigo',
      'IPv4': 'cyan',
      'URL': 'blue',
      'email': 'purple',
      'hostname': 'violet',
      'FileHash-MD5': 'amber',
      'FileHash-SHA256': 'orange',
      'CVE': 'rose'
    };
    
    return typeMap[type] || 'outline';
  };

  const getSeverityBadgeVariant = (severity: string) => {
    const severityMap: Record<string, string> = {
      'Critical': 'destructive',
      'High': 'warning',
      'Medium': 'secondary',
      'Low': 'outline'
    };
    
    return severityMap[severity] || 'outline';
  };
  
  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString || '-';
    }
  };

  return (
    <Card className={cn("overflow-hidden bg-gray-900 border-gray-800 shadow-md shadow-black/10 w-full", className)}>
      {/* Filters Card */}
      <CardHeader className="pb-2 md:pb-4">
        <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
          Recent Threats
        </CardTitle>
        <CardDescription className="text-gray-400 text-sm md:text-base">
          Browse and filter recent cyber threat indicators.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-4 md:p-6">
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-900/95 border border-gray-800 p-4 rounded-lg shadow-sm shadow-black/5 transition-all duration-200 hover:shadow-black/10 hover:border-indigo-500/30 w-full">
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search threats..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-indigo-500/50 w-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-[120px] md:w-[140px] bg-gray-800 border-gray-700 text-white focus:ring-indigo-500/50">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border border-gray-800 overflow-hidden overflow-x-auto w-full">
          <Table>
            <TableHeader className="bg-gray-800/50">
              <TableRow>
                <TableHead className="text-gray-400 text-sm md:text-base">Indicator</TableHead>
                <TableHead className="text-gray-400 text-sm md:text-base">Type</TableHead>
                <TableHead className="text-gray-400 text-sm md:text-base">Severity</TableHead>
                <TableHead className="text-gray-400 text-sm md:text-base">First Seen</TableHead>
                <TableHead className="text-gray-400 text-sm md:text-base">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThreats.length ? (
                filteredThreats.map((threat: ThreatIndicator, index: number) => (
                  <TableRow key={index} className="border-gray-800 hover:bg-gray-800/30 transition-colors duration-200">
                    <TableCell className="font-medium text-white text-sm md:text-base">
                      <div className="max-w-[200px] truncate" title={threat.indicator}>
                        {threat.indicator}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div 
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs md:text-sm font-normal bg-gray-800 border border-gray-700 text-gray-300`}
                      >
                        <span 
                          className={`w-2 h-2 mr-1.5 rounded-full`}
                          style={{ backgroundColor: `var(--tremor-${getTypeBadgeVariant(threat.type)}-500)` }}
                        />
                        {threat.type}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center">
                        {threat.severity === 'Critical' && (
                          <div className="px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-full text-xs md:text-sm font-normal">
                            {threat.severity}
                          </div>
                        )}
                        {threat.severity === 'High' && (
                          <div className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs md:text-sm font-normal">
                            {threat.severity}
                          </div>
                        )}
                        {threat.severity === 'Medium' && (
                          <div className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs md:text-sm font-normal">
                            {threat.severity}
                          </div>
                        )}
                        {threat.severity === 'Low' && (
                          <div className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs md:text-sm font-normal">
                            {threat.severity}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm md:text-base">
                      {formatDate(threat.first_seen)}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm md:text-base">
                      {threat.source || '-'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-gray-800 hover:bg-gray-800/30 transition-colors duration-200">
                  <TableCell colSpan={5} className="h-24 text-center text-gray-400 text-sm md:text-base">
                    No matching threats found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-400">
          <div>
            Showing {filteredThreats.length} of {threats.length} indicators
          </div>
          <div className="mt-2 sm:mt-0">
            Data source: AlienVault OTX
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
