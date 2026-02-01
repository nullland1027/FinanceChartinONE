import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { MARKET_HOURS } from '../config';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const MarketMap = () => {
  const currentHour = new Date().getHours() + new Date().getMinutes() / 60;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 w-full max-w-6xl mx-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-2 px-2">全球市场分布</h2>
      <div className="w-full aspect-[2] flex items-center justify-center bg-blue-50/30 rounded-lg overflow-hidden">
        <ComposableMap 
            projection="geoEquirectangular" 
            projectionConfig={{ scale: 145 }}
            width={800}
            height={400}
            style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo: any) => (
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
            // Calculate market local time to determine day of week
            const now = new Date();
            const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
            const marketTime = new Date(utcTime + (market.timezone * 3600000));
            const marketDay = marketTime.getDay();
            const isWeekend = marketDay === 0 || marketDay === 6;

            const isTimeMatching = market.displayPeriodsBeijingTime?.some(p => {
                const [sh, sm] = p.start.split(':').map(Number);
                const [eh, em] = p.end.split(':').map(Number);
                const s = sh + sm/60;
                const e = eh + em/60;
                return currentHour >= s && currentHour < e;
            });

            // Fallback check
            let isMarketOpen = !isWeekend && isTimeMatching;
            if (market.id === 'cn_a_share') {
                 const h = currentHour;
                 // CN A-share weekend check is covered by generic check above (timezone +8 matches Beijing)
                 // But we keep the specific hour check if needed, but 'isTimeMatching' should cover it if config is correct.
                 // The original code had a hardcoded override for CN A Share hours, let's preserve that logic but add weekend check.
                 const isHoursOpen = (h >= 9.5 && h < 11.5) || (h >= 13 && h < 15);
                 isMarketOpen = !isWeekend && isHoursOpen;
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
