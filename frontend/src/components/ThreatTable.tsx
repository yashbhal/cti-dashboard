'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  TextInput,
  Select,
  SelectItem,
} from '@tremor/react';
import { ThreatIndicator } from '@/types/threat';

interface ThreatTableProps {
  threats: ThreatIndicator[];
}

export default function ThreatTable({ threats }: ThreatTableProps) {
  const [filteredThreats, setFilteredThreats] = useState<ThreatIndicator[]>(threats);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  useEffect(() => {
    let filtered = threats;

    if (search) {
      filtered = filtered.filter(threat =>
        threat.indicator.toLowerCase().includes(search.toLowerCase()) ||
        threat.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(threat => threat.type === typeFilter);
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(threat => threat.severity === severityFilter);
    }

    setFilteredThreats(filtered);
  }, [search, typeFilter, severityFilter, threats]);

  const uniqueTypes = Array.from(new Set(threats.map(threat => threat.type)));
  const severityLevels = ['Low', 'Medium', 'High', 'Critical'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'red';
      case 'High': return 'orange';
      case 'Medium': return 'yellow';
      default: return 'green';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <TextInput
          placeholder="Search indicators or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
          placeholder="Filter by type"
        >
          <SelectItem value="all">All Types</SelectItem>
          {uniqueTypes.map(type => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </Select>
        <Select
          value={severityFilter}
          onValueChange={setSeverityFilter}
          placeholder="Filter by severity"
        >
          <SelectItem value="all">All Severities</SelectItem>
          {severityLevels.map(severity => (
            <SelectItem key={severity} value={severity}>{severity}</SelectItem>
          ))}
        </Select>
      </div>

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
            <TableRow key={idx}>
              <TableCell>{threat.indicator}</TableCell>
              <TableCell>{threat.type}</TableCell>
              <TableCell>{new Date(threat.first_seen).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge color={getSeverityColor(threat.severity)}>
                  {threat.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {threat.tags.slice(0, 3).map((tag, tagIdx) => (
                    <Badge key={tagIdx} color="blue">
                      {tag}
                    </Badge>
                  ))}
                  {threat.tags.length > 3 && (
                    <Badge color="gray">+{threat.tags.length - 3}</Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
