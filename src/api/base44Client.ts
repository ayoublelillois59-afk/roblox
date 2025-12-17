import { Mosque } from '@/entities';

// Stub API client for base44
// This will be replaced with actual API integration later
export const base44 = {
  entities: {
    Mosque: {
      list: async (): Promise<Mosque[]> => {
        // Return empty array for now - will be implemented with real API
        return [];
      }
    }
  }
};
