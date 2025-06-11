'use client';

import { Surah } from '@/types/surah';

interface SurahItemProps {
  surah: Surah;
}

export default function SurahItem({ surah }: SurahItemProps) {
  return (
    <div className="bg-background dark:bg-background-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-accent dark:text-accent-dark">
            {surah.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {surah.englishName} - {surah.englishNameTranslation}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {surah.numberOfAyahs} آيات
          </p>
        </div>
      </div>
    </div>
  );
} 