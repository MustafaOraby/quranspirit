'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
  className?: string;
}

const SearchBar = ({ placeholder = "بحث...", onSearch, className = "" }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative  mx-auto mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
            if (onSearch) onSearch(e.target.value);
          }}
          onFocus={() => setShowResults(true)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600  bg-background-secondary dark:bg-background-secondary-dark text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200"
          dir="rtl"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-[var(--accent)] transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 