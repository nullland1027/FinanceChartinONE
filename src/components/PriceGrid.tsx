import { PriceCard } from './PriceCard';
import type { MarketData } from '../types';
import { useTheme } from '../context/ThemeContext';

interface PriceGridProps {
  data: MarketData[];
  title?: string;
  icon?: string;
  loading?: boolean;
}

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 animate-pulse h-[110px]">
    <div className="flex justify-between items-start mb-3">
      <div className="space-y-2 w-1/2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
      <div className="h-5 w-12 bg-gray-100 rounded"></div>
    </div>
    <div className="flex justify-between items-end mt-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="space-y-1 w-1/4 flex flex-col items-end">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

export const PriceGrid = ({ data, title, icon, loading = false }: PriceGridProps) => {
  const { classes } = useTheme();

  // If loading, show skeletons. If not loading but empty, show "No Data".
  if (!loading && data.length === 0) {
    return <div className="text-gray-400 p-4">暂无数据</div>;
  }

  return (
    <section className="mb-8 animate-in fade-in duration-500">
      {title && (
        <h2 className={`text-xl font-semibold text-gray-700 mb-4 px-3 border-l-4 ${classes.border} flex items-center gap-2`}>
            <span>{icon}</span> {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading 
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : data.map(item => (
              <PriceCard key={item.symbol} data={item} />
            ))
        }
      </div>
    </section>
  );
};
