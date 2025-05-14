'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Badge,
  TextInput,
  Select,
  SelectItem,
  Card,
} from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ThreatTableProps {
  threats: ThreatIndicator[];
}

export default function ThreatTable({ threats = [] }: ThreatTableProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const types = Array.from(new Set(threats.map(threat => threat.type)));
  const severities = ['Critical', 'High', 'Medium', 'Low'];

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = 
      threat.indicator.toLowerCase().includes(search.toLowerCase()) ||
      threat.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || threat.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || threat.severity === severityFilter;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const severityColors: Record<string, string> = {
    Critical: 'rose',
    High: 'orange',
    Medium: 'yellow',
    Low: 'emerald',
  };

  if (!threats?.length) {
    return (
      <Card className="p-6">
        <div className="h-32 flex items-center justify-center">
          <Text>No threat data available</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <TextInput
          icon={MagnifyingGlassIcon}
          placeholder="Search by indicator or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-96"
        />
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
          placeholder="Filter by type"
          className="md:w-48"
        >
          <SelectItem value="all">All Types</SelectItem>
          {types.map(type => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </Select>
        <Select
          value={severityFilter}
          onValueChange={setSeverityFilter}
          placeholder="Filter by severity"
          className="md:w-48"
        >
          <SelectItem value="all">All Severities</SelectItem>
          {severities.map(severity => (
            <SelectItem key={severity} value={severity}>{severity}</SelectItem>
          ))}
        </Select>
      </div>

      {filteredThreats.length === 0 ? (
        <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-tremor-default">
          <Text>No threats match your filters</Text>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Indicator</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>First Seen</TableHeaderCell>
              <TableHeaderCell>Severity</TableHeaderCell>
              <TableHeaderCell>Tags</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredThreats.map((threat, idx) => (
              <TableRow key={`${threat.indicator}-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell>
                  <Text className="font-medium">{threat.indicator}</Text>
                </TableCell>
                <TableCell>
                  <Text>{threat.type}</Text>
                </TableCell>
                <TableCell>
                  <Text>{new Date(threat.first_seen).toLocaleDateString()}</Text>
                </TableCell>
                <TableCell>
                  <Badge color={severityColors[threat.severity]} size="xl">
                    {threat.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {threat.tags.slice(0, 3).map((tag, tagIdx) => (
                      <Badge key={`${tag}-${tagIdx}`} color="blue" size="sm">
                        {tag}
                      </Badge>
                    ))}
                    {threat.tags.length > 3 && (
                      <Badge color="gray" size="sm">
                        +{threat.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
}
