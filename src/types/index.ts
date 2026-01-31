export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'commodity' | 'index';
  region?: 'CN' | 'US' | 'Global';
}
