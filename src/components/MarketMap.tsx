import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { MARKET_HOURS } from '../config';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const MarketMap = () => {
  const currentHour = new Date().getHours() + new Date().getMinutes() / 60;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
      <h2 className="text-lg font-bold text-gray-800 mb-2 px-2">全球市场分布</h2>
      <div className="w-full h-[300px] flex items-center justify-center bg-blue-50/30 rounded-lg">
        <ComposableMap projection="geoEquirectangular" projectionConfig={{ scale: 140 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {MARKET_HOURS.map((market) => {
            const isOpen = market.displayPeriodsBeijingTime?.some(p => {
                const [sh, sm] = p.start.split(':').map(Number);
                const [eh, em] = p.end.split(':').map(Number);
                const s = sh + sm/60;
                const e = eh + em/60;
                return currentHour >= s && currentHour < e;
            });

            // Adjust A-share check manually if displayPeriodsBeijingTime is missing (it is missing for cn_a_share in config logic above, let's fix logic or rely on periods if local)
            // Actually my config update had displayPeriodsBeijingTime only for US/Commodity. 
            // Let's do a simple check: if we are in Beijing time (implied), we can use 'periods' for CN.
            // Simplified logic: Just check if we can parse periods.
            let isMarketOpen = isOpen;
            if (market.id === 'cn_a_share') {
                 // 9:30-11:30, 13:00-15:00
                 const h = currentHour;
                 isMarketOpen = (h >= 9.5 && h < 11.5) || (h >= 13 && h < 15);
            }

            return (
              <Marker key={market.name} coordinates={market.coordinates}>
                <circle r={6} fill={isMarketOpen ? "#22c55e" : "#94a3b8"} stroke="#fff" strokeWidth={2} />
                <circle r={isMarketOpen ? 10 : 0} fill={isMarketOpen ? "#22c55e" : "transparent"} opacity={0.3} className={isMarketOpen ? "animate-ping" : ""} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontFamily: "system-ui", fill: "#475569", fontSize: "10px", fontWeight: "bold" }}
                >
                  {market.name.split(' ')[0]}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
};
