import { useState, useEffect } from 'react';
import { MARKET_HOURS } from '../config';
import { useTheme } from '../context/ThemeContext';
import { getBeijingPeriods } from '../utils/timeUtils';

export const MarketTimeline = () => {
  const [now, setNow] = useState(new Date());
  const { classes } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Beijing Time (UTC+8)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const beijingTime = new Date(utc + (3600000 * 8));
  const currentHour = beijingTime.getHours() + beijingTime.getMinutes() / 60;
  
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
      
      {/* Increased height to accommodate more rows (6 markets) */}
      <div className="relative h-80">
        {/* Background Layer: Chart Coordinate System */}
        <div className="absolute inset-0 flex pointer-events-none">
            {/* Spacer for Labels (matches the w-32 of the rows) */}
            <div className="w-32 shrink-0"></div>
            
            {/* Chart Area */}
            <div className="flex-1 relative border-l border-gray-100">
                {/* Grid Lines */}
                {[0, 4, 8, 12, 16, 20, 24].map((hour) => (
                    <div 
                        key={hour} 
                        className="absolute top-0 bottom-0 w-px bg-dashed border-r border-dashed border-gray-200 flex flex-col items-center" 
                        style={{ left: `${(hour / 24) * 100}%`, transform: 'translateX(-50%)' }}
                    >
                        <span className="mt-2 text-xs text-gray-300 whitespace-nowrap">{hour}:00</span>
                    </div>
                ))}

                {/* Current Time Marker */}
                <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                    style={{ left: `${currentTimePercent}%`, transform: 'translateX(-50%)' }}
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-500 whitespace-nowrap bg-white px-1 rounded shadow-sm border border-red-100">
                        {beijingTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
                    </div>
                </div>
            </div>
        </div>

        {/* Content Layer: Market Rows */}
        <div className="relative z-10 flex flex-col justify-evenly h-full pt-2 pb-6">
            {MARKET_HOURS.map((market) => {
                // Calculate market local time to determine day of week
                // UTC Time = Local Time + TimezoneOffset (minutes)
                // Market Time = UTC Time + Market Timezone (hours)
                // utc variable is already calculated above
                const marketTime = new Date(utc + (market.timezone * 3600000));
                const marketDay = marketTime.getDay();
                const isWeekend = marketDay === 0 || marketDay === 6; // Sunday or Saturday

                // Dynamic calculation of Beijing Time periods from Local Periods
                const beijingPeriods = getBeijingPeriods(market.localPeriods, market.timezone);

                // Check if currently open
                const isTimeMatching = beijingPeriods.some(p => {
                    const [sh, sm] = p.start.split(':').map(Number);
                    const [eh, em] = p.end.split(':').map(Number);
                    const s = sh + sm/60;
                    const e = eh + em/60;
                    
                    return currentHour >= s && currentHour < e;
                });

                const isOpen = !isWeekend && isTimeMatching;

                return (
                    <div key={market.id} className="flex items-center group">
                        <div className="w-32 text-sm font-medium text-gray-600 pr-4 text-right flex flex-col items-end">
                            <span>{market.name}</span>
                            <span className={`text-[10px] px-1.5 rounded ${isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                {isOpen ? '交易中' : '休市'}
                            </span>
                        </div>
                        {/* Removed overflow-hidden to allow labels to pop out */}
                        <div className="flex-1 h-8 bg-gray-50 rounded-lg relative">
                            {beijingPeriods.map((p, idx) => {
                                const start = timeToPercent(p.start);
                                const end = timeToPercent(p.end);
                                const width = end - start;
                                
                                return (
                                    <div key={idx} className="absolute inset-y-0" style={{ left: `${start}%`, width: `${width}%` }}>
                                        {/* The colored bar */}
                                        <div 
                                            className={`h-full w-full rounded-sm opacity-80 ${isOpen ? `${classes.primaryBg} shadow-sm` : classes.light}`}
                                        ></div>
                                        
                                        {/* Start Marker */}
                                        <div className="absolute top-0 bottom-0 left-0 border-l border-dashed border-gray-400/50">
                                            <span className="absolute -top-3 left-0 -translate-x-1/2 text-[9px] text-gray-400 font-mono whitespace-nowrap">
                                                {p.start}
                                            </span>
                                        </div>

                                        {/* End Marker */}
                                        <div className="absolute top-0 bottom-0 right-0 border-r border-dashed border-gray-400/50">
                                            <span className="absolute -top-3 right-0 translate-x-1/2 text-[9px] text-gray-400 font-mono whitespace-nowrap">
                                                {p.end}
                                            </span>
                                        </div>
                                    </div>
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
