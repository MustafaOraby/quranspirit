export const fetchSuwar = async () => {
    const response = await fetch("https://mp3quran.net/api/v3/suwar");
    
    if (!response.ok) {
      throw new Error("Failed to fetch reciters");
    }
  
    const Allsuwar = await response.json();
    return Allsuwar.suwar;
  };
  