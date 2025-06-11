export interface Radio {
  id: string;
  name: string;
  url: string;
  image?: string;
  country: string;
}

export interface Reciter {
  id: string;
  name: string;
  image?: string;
  country: string;
}

export interface Surah {
  id: string;
  name: string;
  number: number;
  versesCount: number;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
} 