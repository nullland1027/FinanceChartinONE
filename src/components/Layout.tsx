import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useMarketData } from '../context/MarketContext';

export const Layout = () => {
  const { lastUpdated } = useMarketData();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-end mb-6">
             <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                更新时间: {lastUpdated.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};
