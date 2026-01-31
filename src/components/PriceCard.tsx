import type { MarketData } from '../types';

interface PriceCardProps {
  data: MarketData;
}

export const PriceCard = ({ data }: PriceCardProps) => {
  const isPositive = data.change >= 0;
  // China standard: Red = Up, Green = Down
  const colorClass = isPositive ? 'text-red-500' : 'text-green-500';
  const bgColorClass = isPositive ? 'bg-red-50' : 'bg-green-50';
  
  const getRegionLabel = () => {
    if (data.type === 'commodity') return '大宗商品';
    if (data.region === 'CN') return '中国';
    if (data.region === 'US') return '美国';
    return '全球';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
           <h3 className="font-bold text-gray-800 text-lg truncate pr-2">{data.name}</h3>
           <span className="text-xs text-gray-400 font-mono">{data.symbol}</span>
        </div>
        <div className={`px-2 py-0.5 rounded text-[10px] font-medium border ${isPositive ? 'border-red-100' : 'border-green-100'} ${bgColorClass} ${colorClass}`}>
            {getRegionLabel()}
        </div>
      </div>
      <div className="flex items-baseline justify-between mt-2">
        <span className={`text-2xl font-bold tracking-tight ${colorClass}`}>
          {data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <div className={`text-right ${colorClass}`}>
            <div className="font-medium text-sm">
                {isPositive ? '+' : ''}{data.change.toFixed(2)}
            </div>
            <div className="text-xs opacity-80">
                {isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%
            </div>
        </div>
      </div>
    </div>
  );
};
