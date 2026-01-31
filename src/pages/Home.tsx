import { MarketTimeline } from '../components/MarketTimeline';
import { MarketMap } from '../components/MarketMap';
import { PriceGrid } from '../components/PriceGrid';
import { useMarketData } from '../context/MarketContext';

export const Home = () => {
  const { data } = useMarketData();
  
  // Provide a mixed view or just key indices
  const keyIndices = data.filter(d => ['000001.SS', 'IXIC', 'GC=F'].includes(d.symbol));

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <MarketTimeline />
        <MarketMap />
      </div>
      
      <PriceGrid title="核心关注" icon="⭐" data={keyIndices} />
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-700">
        💡 提示：点击左侧导航栏查看完整分类行情。
      </div>
    </div>
  );
};
