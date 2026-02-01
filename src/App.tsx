import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CoreFocus } from './pages/CoreFocus';
import { GlobalStocks } from './pages/GlobalStocks';
import { Commodities } from './pages/Commodities';
import { Crypto } from './pages/Crypto';

function App() {
  return (
    <MarketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="core" element={<CoreFocus />} />
            <Route path="stocks" element={<GlobalStocks />} />
            <Route path="commodities" element={<Commodities />} />
            <Route path="crypto" element={<Crypto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MarketProvider>
  );
}

export default App;