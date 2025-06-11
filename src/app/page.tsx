'use client';

import Link from 'next/link';
import { FaQuran, FaMicrophone, FaBroadcastTower, FaBook } from 'react-icons/fa';

export default function Home() {
  const features = [
    {
      title: 'القرآن الكريم',
      description: 'استمع إلى القرآن الكريم بأصوات أشهر القراء',
      icon: <FaQuran className="w-8 h-8" />,
      link: '/reciters',
      color: 'bg-blue-500'
    },
    {
      title: 'الإذاعات',
      description: 'استمع إلى إذاعات القرآن الكريم من مختلف أنحاء العالم',
      icon: <FaBroadcastTower className="w-8 h-8" />,
      link: '/radios',
      color: 'bg-green-500'
    },
    {
      title: 'الأذكار',
      description: 'أذكار الصباح والمساء وأذكار متنوعة',
      icon: <FaBook className="w-8 h-8" />,
      link: '/azkar',
      color: 'bg-purple-500'
    }
  ];

  return (
    <main className="min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-b from-background to-background-secondary dark:from-background-dark dark:to-background-secondary-dark">
        <div className="absolute inset-0 bg-[url('/images/mosque-pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-accent dark:text-accent-dark">
          رَوْحُ القُرْآن
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            منصة متكاملة للاستماع إلى القرآن الكريم والأذكار
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className=" py-8 xl:py-16 bg-background-secondary dark:bg-background-secondary-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="group"
              >
                <div className="  bg-background dark:bg-background-dark rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`${feature.color} m-auto w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4 text-accent dark:text-accent-dark">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16  bg-background dark:bg-background-dark ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-accent dark:text-accent-dark">
              عن المنصة
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              منصة روح القرآن تهدف إلى تسهيل الوصول إلى القرآن الكريم والأذكار من خلال واجهة سهلة الاستخدام وتجربة مستخدم متميزة. يمكنك الاستماع إلى القرآن الكريم بأصوات أشهر القراء، ومتابعة إذاعات القرآن الكريم، والاطلاع على الأذكار المتنوعة.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-secondary dark:bg-background-secondary-dark py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} روح القرآن - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </main>
  );
}
