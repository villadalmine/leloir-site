import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Install } from './pages/Install';
import { Architecture } from './pages/Architecture';
import { CRDs } from './pages/CRDs';
import { Roadmap } from './pages/Roadmap';
import { Memory } from './pages/Memory';
// import { Pricing } from './pages/Pricing';
import { NerdearlaTalk } from './pages/NerdearlaTalk';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="install" element={<Install />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="crds" element={<CRDs />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="memory" element={<Memory />} />
          {/* <Route path="pricing" element={<Pricing />} /> */}
        </Route>
        <Route path="/nerdearla-2026" element={<NerdearlaTalk />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
