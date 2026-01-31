export const APP_CONFIG = {
  // Update interval in milliseconds (1s)
  UPDATE_INTERVAL: 1000, 
};

export const MARKET_HOURS = [
  {
    id: 'cn_a_share',
    name: '中国 A 股 (CN)',
    timezone: 8, // UTC+8
    coordinates: [116.4074, 39.9042] as [number, number], // Beijing
    // Format: HH:mm in local 24h format
    periods: [
      { start: '09:30', end: '11:30' },
      { start: '13:00', end: '15:00' }
    ]
  },
  {
    id: 'us_stocks',
    name: '美股 (US)',
    timezone: -5, // UTC-5 (EST)
    coordinates: [-74.0060, 40.7128] as [number, number], // New York
    // 9:30 AM - 4:00 PM EST
    displayPeriodsBeijingTime: [
       { start: '22:30', end: '24:00' }, // Part 1
       { start: '00:00', end: '05:00' }  // Part 2
    ]
  },
  {
    id: 'commodities',
    name: 'COMEX 贵金属',
    timezone: -5,
    coordinates: [-87.6298, 41.8781] as [number, number], // Chicago (CME Group)
    displayPeriodsBeijingTime: [
        { start: '00:00', end: '06:00' },
        { start: '07:00', end: '24:00' }
    ]
  }
];
