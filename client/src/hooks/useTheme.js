import { useEffect, useState } from 'react';

export default function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('goSharmTheme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('goSharmTheme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggleTheme: () => setDark((value) => !value) };
}
