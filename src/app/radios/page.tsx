"use client";

import { useState, useEffect } from 'react';
import { fetchRadios } from '@/Data/RadiosData';
import { Radio } from '@/utils/types';
import RadioItem from '@/components/allRadios/RadioItem';
import SearchBar from '@/components/SearchBar';
import toast from 'react-hot-toast';

export default function RadiosPage() {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [filteredRadios, setFilteredRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRadioUrl, setSelectedRadioUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadRadios = async () => {
      try {
        const data = await fetchRadios();
        setRadios(data);
        setFilteredRadios(data);
      } catch (error) {
        console.error('Error loading radios:', error);
        setError('Failed to load radios');
      } finally {
        setLoading(false);
      }
    };

    loadRadios();
  }, []);

  const normalizeArabicText = (text: string) => {
    return text
      .replace(/[أإآا]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي');
  };

  const isArabicText = (text: string) => {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  };

  const handleSearch = (term: string) => {
    if (term === '' || isArabicText(term)) {
      const normalizedTerm = normalizeArabicText(term);
      const filtered = radios.filter(radio =>
        normalizeArabicText(radio.name).includes(normalizedTerm)
      );
      setFilteredRadios(filtered);
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
      <h1 className="text-3xl font-bold text-center mb-8">الإذاعات</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Radios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredRadios.map((radio) => (
          <RadioItem
            key={radio.id}
            radio={radio}
            isPlaying={selectedRadioUrl === radio.url}
            onSelect={setSelectedRadioUrl}
          />
        ))}
      </div>
    </main>
  );
}
