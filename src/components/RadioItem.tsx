'use client';

import { Radio } from '@/types/radio';

interface RadioItemProps {
  radio: Radio;
}

export default function RadioItem({ radio }: RadioItemProps) {
  return (
    <div className="bg-background dark:bg-background-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-accent dark:text-accent-dark">
            {radio.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {radio.country}
          </p>
        </div>
      </div>
    </div>
  );
} 