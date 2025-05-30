'use client';


import { useTranslation } from 'react-i18next';


const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className=" w-full  text-foreground border-t border-gray-300 dark:border-gray-700 ">
      
      {/* Copyright */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        © {year} {t('روح القرآن')}. {t('جميع الحقوق محفوظة')} 💖
      </div>
    </footer>
  );
};

export default Footer;
