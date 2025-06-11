import { Radio, Reciter, Surah } from '@/types';

export async function fetchSearchResults(query: string): Promise<{
  radios: Radio[];
  reciters: Reciter[];
  surahs: Surah[];
}> {
  // TODO: Implement actual API call
  // For now, return empty results
  return {
    radios: [],
    reciters: [],
    surahs: []
  };
} 