import type { MarketData } from '../types';

const INITIAL_DATA: MarketData[] = [
  // Commodities
  { symbol: 'GC=F', name: 'COMEX 黄金', price: 2050.50, change: 12.30, changePercent: 0.60, type: 'commodity' },
  { symbol: 'SI=F', name: 'COMEX 白银', price: 23.45, change: -0.15, changePercent: -0.64, type: 'commodity' },
  // CN Indices
  { symbol: '000001.SS', name: '上证指数', price: 2865.90, change: 15.20, changePercent: 0.53, type: 'index', region: 'CN' },
  { symbol: '399001.SZ', name: '深证成指', price: 8890.30, change: -30.50, changePercent: -0.34, type: 'index', region: 'CN' },
  // US Indices
  { symbol: 'IXIC', name: '纳斯达克', price: 15628.95, change: 120.45, changePercent: 0.78, type: 'index', region: 'US' },
  { symbol: 'GSPC', name: '标普 500', price: 4927.93, change: 25.40, changePercent: 0.52, type: 'index', region: 'US' },
];

export const getMarketData = (): Promise<MarketData[]> => {
  return new Promise((resolve) => {
    // Simulate network delay slightly faster for 1s updates
    setTimeout(() => {
      // Fluctuate prices
      const data = INITIAL_DATA.map(item => {
        const volatility = item.price * 0.0002; // Reduced volatility for faster updates
        const changeAmount = (Math.random() - 0.5) * volatility;
        const newPrice = item.price + changeAmount;
        
        const newChange = item.change + changeAmount;
        const newChangePercent = (newChange / (newPrice - newChange)) * 100;

        return {
            ...item,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            changePercent: parseFloat(newChangePercent.toFixed(2))
        };
      });
      
      // Update our "store"
      data.forEach((item, index) => {
        INITIAL_DATA[index] = item;
      });

      resolve(data);
    }, 50);
  });
};