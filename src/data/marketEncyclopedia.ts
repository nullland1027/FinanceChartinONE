export interface MarketInfo {
  title: string;
  description: string;
  specs: {
    exchange: string;       // 交易所
    underlying: string;     // 标的物
    contractSize: string;   // 合约规模
    quoteUnit: string;      // 报价单位
    minFluctuation: string; // 最小变动
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

export const MARKET_ENCYCLOPEDIA: Record<string, MarketInfo> = {
  // Commodities
  'GC=F': {
    title: 'COMEX 黄金期货 (Gold Futures)',
    description: 'COMEX 黄金是全球最重要的黄金定价基准之一。COMEX（Commodity Exchange, Inc.）是纽约商品交易所的分部，隶属于芝加哥商品交易所集团 (CME Group)。黄金期货合约为投资者提供了对冲通胀、地缘政治风险以及进行投机交易的重要工具。',
    specs: {
      exchange: 'COMEX (纽约商品交易所)',
      underlying: '100 盎司不低于 0.995 纯度的精炼黄金',
      contractSize: '100 特洛伊盎司',
      quoteUnit: '美元/特洛伊盎司',
      minFluctuation: '0.10 美元/盎司 ($10.00/合约)'
    },
    faq: [
      {
        question: 'COMEX 是什么意思？',
        answer: 'COMEX 全称 Commodity Exchange, Inc.，即纽约商品交易所。它是全球最大的金属期货交易所，交易品种包括黄金、白银、铜、铝等。'
      },
      {
        question: '黄金期货有什么作用？',
        answer: '黄金通常被视为“避险资产”和“抗通胀工具”。当股市波动大或货币贬值时，资金往往流入黄金市场。'
      },
      {
        question: '什么是“非农”数据对黄金的影响？',
        answer: '美国非农就业数据 (Non-Farm Payrolls) 通常每月发布一次，它反映美国经济状况。数据强劲通常利好美元，利空黄金；数据疲软则利好黄金。'
      }
    ]
  },
  'SI=F': {
    title: 'COMEX 白银期货 (Silver Futures)',
    description: '白银兼具金融属性和工业属性。除了作为贵金属投资，白银在电子、光伏、医疗等工业领域有广泛应用，因此其价格不仅受宏观经济影响，也受工业需求周期的驱动。',
    specs: {
      exchange: 'COMEX (纽约商品交易所)',
      underlying: '5,000 盎司精炼白银',
      contractSize: '5,000 特洛伊盎司',
      quoteUnit: '美元/特洛伊盎司',
      minFluctuation: '0.005 美元/盎司 ($25.00/合约)'
    },
    faq: [
      {
        question: '白银和黄金的关系？',
        answer: '两者通常同向波动，但白银波动率通常高于黄金（被称为“黄金的影子”）。金银比（Gold/Silver Ratio）是衡量两者相对价值的重要指标。'
      }
    ]
  },
  'CL=F': {
    title: 'WTI 原油期货 (Crude Oil)',
    description: 'WTI (West Texas Intermediate) 是美国西德克萨斯轻质中间基原油，是全球原油定价的基准之一（另一个是布伦特原油 Brent）。WTI 价格主要反映美国本土的供需情况。',
    specs: {
      exchange: 'NYMEX (纽约商业交易所)',
      underlying: '1,000 桶 WTI 原油',
      contractSize: '1,000 桶',
      quoteUnit: '美元/桶',
      minFluctuation: '0.01 美元/桶 ($10.00/合约)'
    },
    faq: [
      {
        question: 'WTI 和 Brent 的区别？',
        answer: 'WTI 产自美国，主要在库欣 (Cushing) 交付；Brent 产自北大西洋，主要在欧洲交易。通常 Brent 价格略高于 WTI。'
      }
    ]
  },
  // Indices
  '000001.SS': {
    title: '上证综合指数 (SSE Composite Index)',
    description: '上证综指是上海证券交易所的主要股指，涵盖了在上海证券交易所上市的所有股票（A股和B股）。它是反映中国股市（沪市）整体表现的最权威指标。',
    specs: {
      exchange: 'SSE (上海证券交易所)',
      underlying: '上交所全部上市股票',
      contractSize: 'N/A (指数)',
      quoteUnit: '点',
      minFluctuation: '0.01 点'
    },
    faq: [
      {
        question: '上证指数 3000 点意味着什么？',
        answer: '3000 点常被视为中国股市的一个重要心理关口，反映了市场整体市值的加权水平。'
      }
    ]
  },
  'BTC-USD': {
    title: '比特币 (Bitcoin)',
    description: '比特币是世界上第一种去中心化的数字货币，由中本聪在2009年创立。它基于区块链技术，具有总量恒定（2100万枚）、抗审查、全球流通等特点，被誉为“数字黄金”。',
    specs: {
      exchange: '全球各大加密货币交易所',
      underlying: 'N/A (原生资产)',
      contractSize: '1 BTC',
      quoteUnit: '美元 (USD) / USDT',
      minFluctuation: '0.01 USD'
    },
    faq: [
      {
        question: '什么是“减半” (Halving)？',
        answer: '比特币每产生 21 万个区块（约 4 年），挖矿奖励会减半。这减少了新比特币的供应速度，历史上通常伴随着价格的上涨周期。'
      }
    ]
  }
};
