import { ThreatIndicator } from '@/types/threat';

export const mockThreats: ThreatIndicator[] = [
  {
    indicator: 'malicious.example.com',
    type: 'domain',
    first_seen: '2025-05-14T10:00:00Z',
    severity: 'Critical',
    tags: ['phishing', 'malware', 'botnet', 'c2'],
    source: 'AlienVault OTX'
  },
  {
    indicator: '192.168.1.100',
    type: 'IPv4',
    first_seen: '2025-05-13T15:30:00Z',
    severity: 'High',
    tags: ['scanner', 'bruteforce'],
    source: 'AlienVault OTX'
  },
  {
    indicator: 'https://evil.example.org/malware.exe',
    type: 'URL',
    first_seen: '2025-05-14T08:45:00Z',
    severity: 'Critical',
    tags: ['malware', 'dropper'],
    source: 'AlienVault OTX'
  },
  {
    indicator: '2001:db8::1',
    type: 'IPv6',
    first_seen: '2025-05-12T22:15:00Z',
    severity: 'Medium',
    tags: ['suspicious'],
    source: 'AlienVault OTX'
  },
  {
    indicator: 'badfile.exe',
    type: 'file',
    first_seen: '2025-05-14T11:20:00Z',
    severity: 'High',
    tags: ['ransomware', 'trojan'],
    source: 'AlienVault OTX'
  },
  {
    indicator: 'malware.example.net',
    type: 'domain',
    first_seen: '2025-05-13T09:10:00Z',
    severity: 'Low',
    tags: ['suspicious', 'adware'],
    source: 'AlienVault OTX'
  },
  {
    indicator: '10.0.0.1',
    type: 'IPv4',
    first_seen: '2025-05-14T07:30:00Z',
    severity: 'Medium',
    tags: ['scanning', 'recon'],
    source: 'AlienVault OTX'
  },
  {
    indicator: 'https://bad.example.com/exploit.js',
    type: 'URL',
    first_seen: '2025-05-13T16:45:00Z',
    severity: 'Critical',
    tags: ['exploit', 'javascript'],
    source: 'AlienVault OTX'
  }
];
