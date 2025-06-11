export interface Radio {
  id: string;
  name: string;
  url: string;
  image?: string;
}

export interface Reciter {
  id: string;
  name: string;
  image?: string;
}

export interface Surah {
  id: string;
  name: string;
  number: number;
  versesCount: number;
} 