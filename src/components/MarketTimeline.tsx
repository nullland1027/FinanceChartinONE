import { useState, useEffect } from 'react';
import { MARKET_HOURS } from '../config';

export const MarketTimeline = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = now.getHours() + now.getMinutes() / 60;
  
  // Calculate percentage for current time marker (0-24h)
  const currentTimePercent = (currentHour / 24) * 100;

  // Helper to convert time string "HH:mm" to percentage
  const timeToPercent = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return ((h + m / 60) / 24) * 100;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-6">24小时全球市场状态 (北京时间)</h2>
      
      <div className="relative h-48">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex justify-between text-xs text-gray-300 pointer-events-none select-none">
          {[0, 4, 8, 12, 16, 20, 24].map((hour) => (
            <div key={hour} className="flex flex-col h-full items-center" style={{ width: 0 }}>
              <div className="h-full border-r border-dashed border-gray-200"></div>
              <span className="mt-2">{hour}:00</span>
            </div>
          ))}
        </div>

        {/* Current Time Marker */}
        <div 
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
            style={{ left: `${currentTimePercent}%` }}
        >
            <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="absolute -bottom-6 -translate-x-1/2 text-xs font-bold text-red-500 whitespace-nowrap bg-white px-1 rounded">
                {now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
        </div>

        {/* Market Rows */}
        <div className="relative z-10 flex flex-col justify-evenly h-full pt-2 pb-6">
            {MARKET_HOURS.map((market) => {
                // Check if currently open (naive check against display periods)
                const isOpen = market.displayPeriodsBeijingTime?.some(p => {
                    const [sh, sm] = p.start.split(':').map(Number);
                    const [eh, em] = p.end.split(':').map(Number);
                    const s = sh + sm/60;
                    const e = eh + em/60;
                    
                    // Handle crossing midnight (e.g. 22:00 - 05:00 is split into 22-24 and 0-5 in config)
                    return currentHour >= s && currentHour < e;
                });

                return (
                    <div key={market.id} className="flex items-center group">
                        <div className="w-32 text-sm font-medium text-gray-600 pr-4 text-right flex flex-col items-end">
                            <span>{market.name}</span>
                            <span className={`text-[10px] px-1.5 rounded ${isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                {isOpen ? '交易中' : '休市'}
                            </span>
                        </div>
                        <div className="flex-1 h-8 bg-gray-50 rounded-lg relative overflow-hidden">
                            {market.displayPeriodsBeijingTime?.map((p, idx) => {
                                const start = timeToPercent(p.start);
                                const end = timeToPercent(p.end);
                                const width = end - start;
                                
                                return (
                                    <div 
                                        key={idx}
                                        className={`absolute h-full top-0 rounded-sm opacity-80 ${isOpen ? 'bg-indigo-500 shadow-sm' : 'bg-indigo-200'}`}
                                        style={{ left: `${start}%`, width: `${width}%` }}
                                    ></div>
                                )
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
