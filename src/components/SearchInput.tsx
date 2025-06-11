'use client';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="max-w-md mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg bg-background-secondary dark:bg-background-secondary-dark border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
        dir="rtl"
      />
    </div>
  );
} 