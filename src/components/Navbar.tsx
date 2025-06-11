'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full h-10 bg-background dark:bg-background-dark text-text dark:text-text-dark shadow-md transition-colors">
      <nav className="max-w-7xl mx-auto flex h-full items-center justify-between px-4 py-3">
        <div className="text-xl font-bold tracking-wide"><Link href="/">روح القرآن</Link></div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-lg font-medium rtl:space-x-reverse">
            <li className="hover:text-[var(--accent)] transition-colors">
              <Link href="/radios">إذاعات قرآنية</Link>
            </li>
            <li className="hover:text-[var(--accent)] transition-colors">
              <Link href="/reciters">قراء القرآن</Link>
            </li>
            <li className="hover:text-[var(--accent)] transition-colors">
              <Link href="/azkar">أذكار متنوعة</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} aria-label="Toggle Theme">
            {darkMode ? (
              <Sun className="w-6 h-6 hover:text-[var(--accent)] transition-colors" />
            ) : (
              <Moon className="w-6 h-6 hover:text-[var(--accent)] transition-colors" />
            )}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" aria-label="Toggle Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div
        className={clsx(
          "md:hidden bg-background/80 dark:bg-background-dark/80 text-text dark:text-text-dark px-4 pb-4 text-lg font-medium transition-all duration-300 ease-in-out",
          {
            "max-h-60 opacity-100": menuOpen,
            "max-h-0 overflow-hidden opacity-0": !menuOpen,
          }
        )}
      >
        <ul className="flex flex-col gap-3 items-center justify-center text-center">
          <li className="hover:text-[var(--accent)] transition-colors">
            <Link href="/radios" onClick={() => setMenuOpen(false)}>إذاعات قرآنية</Link>
          </li>
          <li className="hover:text-[var(--accent)] transition-colors">
            <Link href="/reciters" onClick={() => setMenuOpen(false)}>قراء القرآن</Link>
          </li>
          <li className="hover:text-[var(--accent)] transition-colors">
            <Link href="/azkar" onClick={() => setMenuOpen(false)}>أذكار متنوعة</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
