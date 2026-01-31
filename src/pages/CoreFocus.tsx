import { PriceGrid } from '../components/PriceGrid';
import { useMarketData } from '../context/MarketContext';

export const CoreFocus = () => {
  const { data, loading } = useMarketData();
  
  // Custom filter for core items
  const keyIndices = data.filter(d => ['000001.SS', 'IXIC', 'GC=F', 'CL=F', '^HSI', '^N225', '^FTSE'].includes(d.symbol));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">核心关注</h1>
      <PriceGrid title="重点追踪" icon="⭐" data={keyIndices} loading={loading} />
    </div>
  );
};
