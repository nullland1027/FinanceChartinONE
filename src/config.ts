export const APP_CONFIG = {
  // Update interval in milliseconds (1s)
  UPDATE_INTERVAL: 1000, 
};

export const MARKET_HOURS = [
  {
    id: 'jp_stocks',
    name: '日本股市 (JP)',
    timezone: 9, // UTC+9
    coordinates: [139.6917, 35.6895] as [number, number], // Tokyo
    // 9:00 - 11:30, 12:30 - 15:00 (Tokyo Time)
    // Beijing (UTC+8) is -1h from Tokyo.
    // Beijing: 8:00 - 10:30, 11:30 - 14:00
    displayPeriodsBeijingTime: [
        { start: '08:00', end: '10:30' },
        { start: '11:30', end: '14:00' }
    ]
  },
  {
    id: 'hk_stocks',
    name: '香港股市 (HK)',
    timezone: 8, // UTC+8
    coordinates: [114.1694, 22.3193] as [number, number], // Hong Kong
    // 9:30 - 12:00, 13:00 - 16:00
    displayPeriodsBeijingTime: [
        { start: '09:30', end: '12:00' },
        { start: '13:00', end: '16:00' }
    ]
  },
  {
    id: 'cn_a_share',
    name: '中国 A 股 (CN)',
    timezone: 8, // UTC+8
    coordinates: [116.4074, 39.9042] as [number, number], // Beijing
    // Format: HH:mm in local 24h format
    // 9:30 - 11:30, 13:00 - 15:00
    displayPeriodsBeijingTime: [
        { start: '09:30', end: '11:30' },
        { start: '13:00', end: '15:00' }
    ],
    periods: [
      { start: '09:30', end: '11:30' },
      { start: '13:00', end: '15:00' }
    ]
  },
  {
    id: 'uk_stocks',
    name: '英国股市 (UK)',
    timezone: 0, // UTC+0 (GMT)
    coordinates: [-0.1278, 51.5074] as [number, number], // London
    // 8:00 - 16:30 (London Time)
    // Beijing is +8h.
    // Beijing: 16:00 - 00:30 (+1)
    displayPeriodsBeijingTime: [
        { start: '16:00', end: '24:00' },
        { start: '00:00', end: '00:30' }
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
    name: 'CME 大宗商品',
    timezone: -5,
    coordinates: [-87.6298, 41.8781] as [number, number], // Chicago (CME Group)
    displayPeriodsBeijingTime: [
        { start: '00:00', end: '06:00' },
        { start: '07:00', end: '24:00' }
    ]
  }
];
