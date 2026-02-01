import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { MarketData } from '../types';
import { getMarketData } from '../services/mockDataService';
import { APP_CONFIG } from '../config';

interface MarketContextType {
  data: MarketData[];
  loading: boolean;
  lastUpdated: Date;
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  
  // Initialize from localStorage or config
  const [refreshInterval, setRefreshIntervalState] = useState<number>(() => {
    const saved = localStorage.getItem('app-refresh-interval');
    return saved ? parseInt(saved, 10) : APP_CONFIG.UPDATE_INTERVAL;
  });

  const setRefreshInterval = (interval: number) => {
    setRefreshIntervalState(interval);
    localStorage.setItem('app-refresh-interval', interval.toString());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMarketData();
        // Only stop loading if we actually got data. 
        // If result is empty (backend down), we keep loading state to show Skeletons/Spinner 
        // effectively indicating "waiting for connection".
        if (result && result.length > 0) {
            setData(result);
            setLastUpdated(new Date());
            setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
        // Do not set loading(false) here, keep retrying visually
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return (
    <MarketContext.Provider value={{ data, loading, lastUpdated, refreshInterval, setRefreshInterval }}>
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
