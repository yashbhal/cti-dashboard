'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ThreatIndicator } from '@/types/threat';

interface ThreatTableProps {
  threats: ThreatIndicator[];
}

export default function ThreatTable({ threats = [] }: ThreatTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  if (!threats?.length) {
    return (
      <Card className="p-6">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Recent Threats</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>No threat data available</p>
          </div>
        </div>
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
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      default:
        return 'success';
    }
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Recent Threats</h3>
          <p className="text-sm text-muted-foreground">
            Browse and filter recent cyber threat indicators.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search threats..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={selectedSeverity}
            onValueChange={setSelectedSeverity}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicator</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredThreats.map((threat, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{threat.indicator}</TableCell>
                  <TableCell>{threat.type}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityVariant(threat.severity)}>
                      {threat.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{threat.source}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
