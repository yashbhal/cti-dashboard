export interface ThreatIndicator {
  indicator: string;
  type: string;
  first_seen: string;
  source: string;
  tags: string[];
  severity: "Low" | "Medium" | "High" | "Critical";
}
