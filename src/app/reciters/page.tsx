"use client";

import { useState, useEffect } from "react";
import ReaderItem from "../../components/allReaders/ReaderItem";
import { AllReciters } from "../../utils/types";
import { fetchReciters } from "../../Data/RecitersData";
import SearchBar from "../../components/SearchBar";
import toast from 'react-hot-toast';

export default function RecitersPage() {
  const [reciters, setReciters] = useState<AllReciters['reciters']>([]);
  const [filteredReciters, setFilteredReciters] = useState<AllReciters['reciters']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadReciters = async () => {
      try {
        const data = await fetchReciters();
        setReciters(data);
        setFilteredReciters(data);
      } catch (error) {
        console.error('Error loading reciters:', error);
        setError('Failed to load reciters');
      } finally {
        setLoading(false);
      }
    };
    
    loadReciters();
  }, []);

  const normalizeArabicText = (text: string) => {
    return text
      .replace(/[أإآا]/g, 'ا') // Normalize Alef variations
      .replace(/ى/g, 'ي')      // Normalize Ya variations
      .replace(/ة/g, 'ه')      // Normalize Ta Marbuta
      .replace(/ؤ/g, 'و')      // Normalize Waw with Hamza
      .replace(/ئ/g, 'ي')      // Normalize Ya with Hamza
      .toLowerCase();
  };

  const isArabicText = (text: string) => {
    // Regular expression to match Arabic characters and common Arabic symbols
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  };

  const handleSearch = (term: string) => {
    if (term === '' || isArabicText(term)) {
      setSearchTerm(term);
      const normalizedTerm = normalizeArabicText(term);
      const filtered = reciters.filter(reciter =>
        normalizeArabicText(reciter.name).includes(normalizedTerm)
      );
      setFilteredReciters(filtered);
    } else {
      toast.error('يرجى البحث باللغة العربية', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
          textAlign: 'center',
          padding: '16px',
          borderRadius: '8px',
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] mt-[30px]">
      <h1 className="text-3xl font-bold text-center mb-8">القراء</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Reciters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredReciters.map((reciter) => (
          <ReaderItem key={reciter.id} reciter={reciter} />
        ))}
      </div>
    </main>
  );
}
