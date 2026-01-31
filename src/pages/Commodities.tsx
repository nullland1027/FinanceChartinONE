import { PriceGrid } from '../components/PriceGrid';
import { useMarketData } from '../context/MarketContext';

export const Commodities = () => {
  const { data, loading } = useMarketData();
  const commodities = data.filter(d => d.type === 'commodity');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">大宗商品</h1>
      <PriceGrid title="CME 大宗商品" icon="🏆" data={commodities} loading={loading} />
    </div>
  );
};
