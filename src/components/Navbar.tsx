'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import clsx from 'clsx';

const Navbar = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent SSR mismatch
  useEffect(() => {
    setHasMounted(true);

    // Dark mode preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  if (!hasMounted) return null; // Don't render until client mounted

  return (
    <header className="sticky top-0 z-50 w-full h-10 bg-background dark:bg-background-dark text-text dark:text-text-dark shadow-md transition-colors">
      <nav className="max-w-7xl mx-auto  flex h-full items-center justify-between px-4 py-3">
        <div className="text-xl font-bold tracking-wide">روح القرآن</div>

        {/* <ul className="hidden md:flex gap-6  text-lg font-medium rtl:space-x-reverse">
          <li className="hover:text-[var(--accent)] transition-colors">
            <Link href="/radios">إذاعات قرآنية</Link>
          </li>
          <li className="hover:text-[var(--accent)] transition-colors">
            <Link href="/reciters">قراء القرآن</Link>
          </li>
          <li className="hover:text-[var(--accent)] transition-colors">
            <Link href="/azkar">أذكار متنوعة</Link>
          </li>
        </ul> */}

        <div className="flex items-center gap-4">
          <button aria-label="Toggle Language">
            <Globe className="w-6 h-6 hover:text-[var(--accent)] transition-colors" />
          </button>

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
        <ul className="  flex flex-col gap-3 items-center justify-center text-center ">
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
