"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AllReciters } from "../../utils/types";
import { fetchReciters } from "../../Data/RecitersData";
import ReaderItem from "../../components/allReaders/ReaderItem";
import { Search } from "lucide-react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [reciters, setReciters] = useState<AllReciters["reciters"]>([]);
  const [searchTerm, setSearchTerm] = useState(query);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReciters = async () => {
      try {
        const data = await fetchReciters();
        setReciters(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading reciters:", error);
        setIsLoading(false);
      }
    };

    loadReciters();
  }, []);

  const filteredReciters = reciters.filter(reciter =>
    reciter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchTerm);
    window.history.pushState({}, "", url);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mainColor"></div>
      </div>
    );
  }

  return (
    <section className="min-h-[calc(100vh-100px)] w-full flex flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن قارئ..."
              className="w-full px-4 py-3 rounded-full bg-background-secondary dark:bg-background-secondary-dark text-text dark:text-text-dark border border-accent dark:border-accent-dark focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark text-lg"
              dir="rtl"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 hover:text-mainColor transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </form>

        {searchTerm && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-center text-gray-600 dark:text-gray-300">
              نتائج البحث عن: {searchTerm}
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
              {filteredReciters.length} قارئ
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {filteredReciters.length > 0 ? (
            filteredReciters.map((reciter) => (
              <ReaderItem key={reciter.id} reciter={reciter} />
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              {searchTerm ? "لا توجد نتائج" : "اكتب اسم القارئ للبحث"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage; 