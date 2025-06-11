"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchSearchResults } from '@/lib/api';
import { useState, useEffect } from 'react';
import { Radio, Reciter, Surah } from '@/types';
import RadioItem from '@/components/RadioItem';
import ReciterItem from '@/components/ReciterItem';
import SurahItem from '@/components/SurahItem';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<{
    radios: Radio[];
    reciters: Reciter[];
    surahs: Surah[];
  }>({ radios: [], reciters: [], surahs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setResults({ radios: [], reciters: [], surahs: [] });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchSearchResults(query);
        setResults(data);
        setError(null);
      } catch (err) {
        setError('حدث خطأ أثناء البحث');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  if (loading) {
    return <div className="text-center py-8">جاري البحث...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!query) {
    return <div className="text-center py-8">الرجاء إدخال كلمة البحث</div>;
  }

  if (results.radios.length === 0 && results.reciters.length === 0 && results.surahs.length === 0) {
    return <div className="text-center py-8">لا توجد نتائج</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {results.radios.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">الإذاعات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.radios.map((radio) => (
              <RadioItem key={radio.id} radio={radio} />
            ))}
          </div>
        </div>
      )}

      {results.reciters.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">القراء</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.reciters.map((reciter) => (
              <ReciterItem key={reciter.id} reciter={reciter} />
            ))}
          </div>
        </div>
      )}

      {results.surahs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">السور</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.surahs.map((surah) => (
              <SurahItem key={surah.id} surah={surah} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">جاري التحميل...</div>}>
      <SearchResults />
    </Suspense>
  );
} 