import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext<{
  lang: string;
  setLang: (l: string) => void;
  t: (obj: any) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(localStorage.getItem('leloir_lang') || 'en');
  
  useEffect(() => {
    localStorage.setItem('leloir_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (obj: any) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || obj[Object.keys(obj)[0]] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
