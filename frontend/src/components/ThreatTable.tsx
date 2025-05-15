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
      <Card className={cn("overflow-hidden bg-gray-900 border-gray-800 shadow-lg shadow-black/5", className)}>
        <CardHeader>
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            Recent Threats
          </CardTitle>
          <CardDescription className="text-gray-400">
            Browse and filter recent cyber threat indicators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-4">
            <div className="rounded-full bg-gray-800 p-4">
              <AlertCircle className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm">No threat data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const types = Array.from(new Set(threats.map(threat => threat.type)));
  const severities = ['Critical', 'High', 'Medium', 'Low'];

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || threat.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-300 bg-red-500/20 border-red-500/30';
      case 'High':
        return 'text-amber-300 bg-amber-500/20 border-amber-500/30';
      case 'Medium':
        return 'text-blue-300 bg-blue-500/20 border-blue-500/30';
      default:
        return 'text-green-300 bg-green-500/20 border-green-500/30';
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Filter Card */}
      <Card className="overflow-hidden bg-gray-900 border-gray-800 shadow-lg shadow-black/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-500" />
            Search & Filters
          </CardTitle>
          <CardDescription className="text-gray-400">
            Filter threats by keyword or severity level
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search threats..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-colors text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedSeverity}
              onValueChange={setSelectedSeverity}
            >
              <SelectTrigger className="w-full bg-gray-800 border-gray-700 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-colors text-white">
                <SelectValue placeholder="All Severities" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-white">
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Table Card */}
      <Card className="overflow-hidden bg-gray-900 border-gray-800 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle className="text-xl font-medium flex items-center gap-2">
            Recent Threats
          </CardTitle>
          <CardDescription className="text-gray-400">
            Browse and filter recent cyber threat indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

        <div className="rounded-md border border-gray-800 overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800/50 hover:bg-gray-800/50">
                <TableHead className="font-medium text-white sticky top-0">Indicator</TableHead>
                <TableHead className="font-medium text-white sticky top-0">Type</TableHead>
                <TableHead className="font-medium text-white sticky top-0">Severity</TableHead>
                <TableHead className="font-medium text-white sticky top-0">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThreats.length > 0 ? (
                filteredThreats.map((threat, index) => (
                  <TableRow 
                    key={index} 
                    className={cn(
                      "transition-colors hover:bg-gray-800/70",
                      index % 2 === 0 ? "bg-transparent" : "bg-gray-800/30"
                    )}
                  >
                    <TableCell className="font-medium text-white">{threat.indicator}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-indigo-500/20 text-indigo-300">
                        {threat.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={cn("font-medium", getSeverityColor(threat.severity))}
                      >
                        {threat.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">{threat.source}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                      <Search className="h-4 w-4" />
                      <p className="text-sm">No results found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredThreats.length > 0 && (
          <div className="text-xs text-gray-400 text-center pt-2">
            Showing {filteredThreats.length} of {threats.length} threats
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
