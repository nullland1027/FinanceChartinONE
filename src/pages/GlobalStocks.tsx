import { PriceGrid } from '../components/PriceGrid';
import { useMarketData } from '../context/MarketContext';

export const GlobalStocks = () => {
  const { data, loading } = useMarketData();
  const cnStocks = data.filter(d => d.region === 'CN');
  const usStocks = data.filter(d => d.region === 'US');
  const globalStocks = data.filter(d => d.region === 'Global');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">全球股市</h1>
      <PriceGrid title="中国市场 (A股/港股)" icon="🇨🇳" data={cnStocks} loading={loading} />
      <PriceGrid title="美国市场" icon="🇺🇸" data={usStocks} loading={loading} />
      <PriceGrid title="其他主要市场" icon="🌍" data={globalStocks} loading={loading} />
    </div>
  );
};
