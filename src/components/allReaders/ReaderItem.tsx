"use client";

import React, { useState } from "react";

import Moshaf from "../../../public/images/moshaf.png";
import Image from "next/image";
import Link from "next/link";
import { TiStarburstOutline } from "react-icons/ti";

import { Reciter, AllReciters } from "../../utils/types";

interface ReaderItemProps {
  reciter: AllReciters['reciters'][0];
}

const ReaderItem = ({ reciter }: ReaderItemProps) => {
  const [showMoshaf, setShowMoshaf] = useState(false);

  return (
    <div className="bg-background-secondary dark:bg-background-secondary-dark rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold mb-2 text-text dark:text-text-dark">
          {reciter.name}
        </h3>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {reciter.moshaf.slice(0, showMoshaf ? undefined : 2).map((moshaf, index) => (
            <Link
              key={index}
              href={`/reciters/${moshaf.id}`}
              className="px-3 py-1 text-sm bg-background dark:bg-background-dark text-text dark:text-text-dark rounded-full border border-accent dark:border-accent-dark hover:bg-accent/10 dark:hover:bg-accent-dark/10 transition-colors"
            >
              {moshaf.name}
            </Link>
          ))}
        </div>
        <button 
          onClick={() => setShowMoshaf(!showMoshaf)}
          className="w-full bg-accent dark:bg-accent-dark text-white py-2 rounded-lg hover:bg-accent/90 dark:hover:bg-accent-dark/90 transition-colors"
        >
          {showMoshaf ? 'عرض أقل' : 'جميع التلاوات'}
        </button>
      </div>
    </div>
  );
};

export default ReaderItem;
