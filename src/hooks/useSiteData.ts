import { useState, useEffect } from 'react';

export function useSiteData<T>(filename: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${filename}: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.toString());
        setLoading(false);
      });
  }, [filename]);

  return { data, loading, error };
}

export function useSiteText(filename: string) {
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${filename}`);
        return res.text();
      })
      .then(txt => {
        setText(txt);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [filename]);

  return { text, loading };
}

export function t(obj: any, lang: string = 'en'): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.en || obj[Object.keys(obj)[0]] || '';
}
