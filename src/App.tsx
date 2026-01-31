import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { GlobalStocks } from './pages/GlobalStocks';
import { Commodities } from './pages/Commodities';

function App() {
  return (
    <MarketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="stocks" element={<GlobalStocks />} />
            <Route path="commodities" element={<Commodities />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MarketProvider>
  );
}

export default App;