import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { MarketData } from '../types';
import { getMarketData } from '../services/mockDataService';
import { APP_CONFIG } from '../config';

interface MarketContextType {
  data: MarketData[];
  loading: boolean;
  lastUpdated: Date;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMarketData();
        setData(result);
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, APP_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <MarketContext.Provider value={{ data, loading, lastUpdated }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarketData must be used within a MarketProvider');
  }
  return context;
};
