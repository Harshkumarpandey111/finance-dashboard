import { useEffect, useState } from 'react';
import useStore from './store/useStore';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SkeletonLoader from './components/SkeletonLoader';

export default function App() {
  const darkMode = useStore(s => s.darkMode);
  const [ready, setReady] = useState(false);

  /* Apply dark class to <html> */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  /* Simulate a brief load — lets the skeleton render on first visit */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 680);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-linen)' }}>
      <Header />
      {ready ? <Dashboard /> : <SkeletonLoader />}
    </div>
  );
}
