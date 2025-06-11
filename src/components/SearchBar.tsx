'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="ابحث..."
      className="w-full px-4 py-2 rounded-lg bg-background-secondary dark:bg-background-secondary-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
      dir="rtl"
    />
  );
} 