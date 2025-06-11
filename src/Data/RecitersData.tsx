export const fetchReciters = async () => {
  const response = await fetch("https://mp3quran.net/api/v3/reciters");
  
  if (!response.ok) {
    throw new Error("Failed to fetch reciters");
  }

  const allReciters = await response.json();
  return allReciters.reciters;
};
