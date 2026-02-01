import { useState } from 'react';
import type { MarketData } from '../types';
import { MARKET_ENCYCLOPEDIA } from '../data/marketEncyclopedia';
import { InfoModal } from './InfoModal';
import { Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PriceCardProps {
  data: MarketData;
}

export const PriceCard = ({ data }: PriceCardProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { } = useTheme();
  
  const isPositive = data.change >= 0;
  // China standard: Red = Up, Green = Down
  const colorClass = isPositive ? 'text-red-500' : 'text-green-500';
  const bgColorClass = isPositive ? 'bg-red-50' : 'bg-green-50';
  
  const info = MARKET_ENCYCLOPEDIA[data.symbol];
  const hasInfo = !!info;

  const getRegionLabel = () => {
    if (data.type === 'commodity') return '大宗商品';
    if (data.region === 'CN') return '中国';
    if (data.region === 'US') return '美国';
    return '全球';
  };

  return (
    <>
      <div 
        onClick={() => hasInfo && setShowInfo(true)}
        className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-100 relative group ${hasInfo ? 'cursor-pointer hover:border-indigo-200' : ''}`}
      >
        {hasInfo && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
                <Info size={16} />
            </div>
        )}
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

      {hasInfo && (
        <InfoModal 
            isOpen={showInfo} 
            onClose={() => setShowInfo(false)} 
            info={info}
            symbol={data.symbol}
        />
      )}
    </>
  );
};
