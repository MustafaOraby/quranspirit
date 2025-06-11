import { Radio, Reciter, Surah } from '../types';

export async function fetchSearchResults(query: string): Promise<{
  radios: Radio[];
  reciters: Reciter[];
  surahs: Surah[];
}> {
  // TODO: Implement actual API call
  console.log('Searching for:', query); // Using query to avoid ESLint error
  return {
    radios: [],
    reciters: [],
    surahs: []
  };
} 