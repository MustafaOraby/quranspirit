'use client';

import { useState, useRef } from 'react';
import { getAllCategories } from '@/Data/azkarMap';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Zikr {
  id: number;
  text: string;
  count: number;
  audio: string;
  filename: string;
}




export default function AzkarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  

  const isArabicText = (text: string) => {
    // Regular expression to match Arabic characters and common Arabic symbols
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(text);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === '' || isArabicText(value)) {
      setSearchTerm(value);
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



  const categories = getAllCategories();
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-[calc(100vh-64px)] mt-[30px]">
      <h1 className="text-3xl font-bold text-center mb-8">الأذكار</h1>

      {/* Search Bar */}
      <div className="max-w-[40%] mx-auto mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="ابحث عن ذكر..."
          className="w-full px-4 py-2 rounded-lg bg-background-secondary dark:bg-background-secondary-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
          dir="rtl"
        />
      </div>
      
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/azkar/${category.id}`}
              className="p-4 rounded-lg text-center xl:text-lg transition-colors bg-background-secondary dark:bg-background-secondary-dark hover:bg-accent/10 dark:hover:bg-accent-dark/10"
            >
              {category.category}
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 dark:text-gray-300">
            لا توجد نتائج للبحث
          </div>
        )}
      </div>
    </main>
  );
}