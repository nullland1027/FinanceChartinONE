import { PriceCard } from './PriceCard';
import type { MarketData } from '../types';

interface PriceGridProps {
  data: MarketData[];
  title?: string;
  icon?: string;
}

export const PriceGrid = ({ data, title, icon }: PriceGridProps) => {
  if (data.length === 0) {
    return <div className="text-gray-400 p-4">暂无数据</div>;
  }

  return (
    <section className="mb-8 animate-in fade-in duration-500">
      {title && (
        <h2 className="text-xl font-semibold text-gray-700 mb-4 px-3 border-l-4 border-indigo-500 flex items-center gap-2">
            <span>{icon}</span> {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map(item => (
            <PriceCard key={item.symbol} data={item} />
        ))}
      </div>
    </section>
  );
};
