import { PriceGrid } from '../components/PriceGrid';
import { useMarketData } from '../context/MarketContext';

export const Commodities = () => {
  const { data } = useMarketData();
  const commodities = data.filter(d => d.type === 'commodity');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">大宗商品</h1>
      <PriceGrid title="COMEX 贵金属" icon="🏆" data={commodities} />
    </div>
  );
};
