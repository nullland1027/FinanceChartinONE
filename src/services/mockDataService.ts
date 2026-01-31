import type { MarketData } from '../types';

const BACKEND_URL = 'http://localhost:8000/api/market-data';

export const getMarketData = async (): Promise<MarketData[]> => {
  try {
    const response = await fetch(BACKEND_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Could not fetch market data from backend, falling back to empty array', error);
    return [];
  }
};