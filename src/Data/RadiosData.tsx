import { Radio } from '../utils/types';

export const fetchRadios = async (): Promise<Radio[]> => {
  try {
    const response = await fetch("https://mp3quran.net/api/v3/radios");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data.radios;
  } catch (error) {
    console.error('Error fetching radios:', error);
    throw error;
  }
}; 