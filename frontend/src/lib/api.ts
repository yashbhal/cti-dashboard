import { ThreatIndicator } from '@/types/threat';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchThreats(days: number = 7): Promise<ThreatIndicator[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/threats?days=${days}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch threat data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching threat data:', error);
    throw error;
  }
}
