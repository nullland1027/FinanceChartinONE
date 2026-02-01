export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'commodity' | 'index' | 'crypto';
  region?: 'CN' | 'US' | 'Global';
}
