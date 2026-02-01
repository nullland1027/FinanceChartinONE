import { PriceGrid } from '../components/PriceGrid';
import { useMarketData } from '../context/MarketContext';

export const Crypto = () => {
  const { data, loading } = useMarketData();
  const cryptos = data.filter(d => d.type === 'crypto');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">数字货币</h1>
      <PriceGrid title="主流加密货币" icon="🪙" data={cryptos} loading={loading} />
    </div>
  );
};
