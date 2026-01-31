import type { MarketData } from '../types';

const INITIAL_DATA: MarketData[] = [
  // Commodities
  { symbol: 'GC=F', name: 'COMEX 黄金', price: 2050.50, change: 12.30, changePercent: 0.60, type: 'commodity' },
  { symbol: 'SI=F', name: 'COMEX 白银', price: 23.45, change: -0.15, changePercent: -0.64, type: 'commodity' },
  { symbol: 'CL=F', name: 'WTI 原油', price: 77.40, change: 0.85, changePercent: 1.11, type: 'commodity' },
  // CN Indices
  { symbol: '000001.SS', name: '上证指数', price: 2865.90, change: 15.20, changePercent: 0.53, type: 'index', region: 'CN' },
  { symbol: '399001.SZ', name: '深证成指', price: 8890.30, change: -30.50, changePercent: -0.34, type: 'index', region: 'CN' },
  // US Indices
  { symbol: 'IXIC', name: '纳斯达克', price: 15628.95, change: 120.45, changePercent: 0.78, type: 'index', region: 'US' },
  { symbol: 'GSPC', name: '标普 500', price: 4927.93, change: 25.40, changePercent: 0.52, type: 'index', region: 'US' },
  // HK Indices
  { symbol: '^HSI', name: '恒生指数', price: 15533.56, change: -234.12, changePercent: -1.48, type: 'index', region: 'CN' },
  // JP Indices
  { symbol: '^N225', name: '日经 225', price: 36011.46, change: 200.32, changePercent: 0.56, type: 'index', region: 'Global' },
  // UK Indices
  { symbol: '^FTSE', name: '英国富时 100', price: 7635.09, change: 5.40, changePercent: 0.07, type: 'index', region: 'Global' },
];

export const getMarketData = (): Promise<MarketData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Fluctuate prices
      const data = INITIAL_DATA.map(item => {
        const volatility = item.price * 0.0002;
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
      
      data.forEach((item, index) => {
        INITIAL_DATA[index] = item;
      });

      resolve(data);
    }, 50);
  });
};
