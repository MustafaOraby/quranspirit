'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly with custom easing
  const scrollToTop = () => {
    const currentPosition = window.pageYOffset;
    const targetPosition = 0;
    const distance = targetPosition - currentPosition;
    const duration = 1000; // 1 second duration
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smooth acceleration and deceleration
      const easeInOutCubic = (t: number) => t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

      window.scrollTo(0, currentPosition + distance * easeInOutCubic(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-accent dark:bg-primary  text-white shadow-lg transition-all duration-700 ease-in-out hover:bg-accent-dark dark:hover:bg-primary/90 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className={`w-5 h-5 transition-transform duration-700 ease-in-out ${
        isVisible ? 'animate-bounce-subtle' : ''
      }`} />
    </button>
  );
} 