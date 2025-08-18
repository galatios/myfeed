export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  link: string;
  source: string;
  timestamp: Date;
  imageUrl?: string;
}

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Global Markets Surge on Positive Economic Data',
    content: 'Investors reacted positively to new reports showing stronger-than-expected GDP growth and declining unemployment rates across major economies. The tech and renewable energy sectors led the gains, with several blue-chip stocks hitting all-time highs. Analysts suggest this could signal a sustained recovery period, though caution remains regarding inflationary pressures.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Yahoo Finance',
    timestamp: new Date('2023-10-27T10:00:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '2',
    title: 'Fed Hints at Pausing Interest Rate Hikes',
    content: 'In a much-anticipated speech, the Federal Reserve chair indicated that the central bank might hold off on further interest rate increases for the time being. The statement cited a cooling inflation rate and a desire to assess the full impact of previous hikes. The bond market rallied on the news, with yields on 10-year Treasury notes dropping significantly.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Reuters',
    timestamp: new Date('2023-10-27T10:05:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '3',
    title: 'InnovateCorp Unveils Breakthrough AI Chip, Stock Soars 25%',
    content: 'InnovateCorp (INV.C) today announced the development of a new AI processor that it claims is twice as powerful and 50% more energy-efficient than current market leaders. The news sent the company\'s stock price soaring in pre-market trading. This development could reshape the competitive landscape in the semiconductor industry.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Bloomberg',
    timestamp: new Date('2023-10-27T10:10:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '4',
    title: 'Oil Prices Tumble Amidst Supply Glut Concerns',
    content: 'Crude oil prices fell by over 5% today as new data revealed an unexpected increase in global oil reserves. OPEC+ has not yet indicated if it will cut production to stabilize prices, leading to market uncertainty. The drop is expected to provide some relief to consumers at the pump but puts pressure on oil-exporting nations.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Wall Street Journal',
    timestamp: new Date('2023-10-27T10:15:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '5',
    title: 'E-Commerce Giant "ShopSphere" Beats Earnings Expectations',
    content: 'ShopSphere (SHSP) reported quarterly earnings that surpassed analyst forecasts, driven by strong growth in its international and cloud computing divisions. Despite a slowdown in domestic retail, the company\'s diversified business model proved resilient. The positive results have boosted confidence in the broader e-commerce sector.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Yahoo Finance',
    timestamp: new Date('2023-10-27T10:20:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '6',
    title: 'Emerging Markets Face Headwinds from Stronger Dollar',
    content: 'A strengthening U.S. dollar is creating challenges for emerging economies, making it more expensive to service dollar-denominated debt and pay for imports. Central banks in several developing nations are now contemplating currency interventions to mitigate the economic impact.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Financial Times',
    timestamp: new Date('2023-10-27T10:25:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '7',
    title: 'GreenLeaf Energy Secures $2 Billion for Solar Farm Expansion',
    content: 'Renewable energy firm GreenLeaf Energy (GLEX) has secured major funding to expand its solar power operations across North America. The investment is one of the largest in the sector this year and underscores the growing investor appetite for clean energy projects.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Reuters',
    timestamp: new Date('2023-10-27T10:30:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '8',
    title: 'Automakers Grapple with Ongoing Chip Shortage',
    content: 'Major auto manufacturers are once again revising their production forecasts downwards due to the persistent global shortage of semiconductors. The issue has hampered their ability to meet consumer demand and is forcing companies to prioritize production of their most profitable models.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Associated Press',
    timestamp: new Date('2023-10-27T10:35:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '9',
    title: 'Luxury Goods Market Shows Surprising Resilience',
    content: 'Despite broader economic concerns, the market for luxury goods continues to show robust growth. High-end brands are reporting strong sales, particularly among affluent consumers in Asia and the Middle East, signaling that discretionary spending in this segment remains strong.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Bloomberg',
    timestamp: new Date('2023-10-27T10:40:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: '10',
    title: 'Startup "HealthTrack" Goes Public in Highly-Anticipated IPO',
    content: 'Digital health startup HealthTrack made its debut on the Nasdaq today, with its stock opening 40% above its initial public offering price. The company specializes in wearable devices that monitor chronic health conditions, a rapidly growing segment of the healthcare industry.',
    link: 'https://finance.yahoo.com/news/',
    source: 'Wall Street Journal',
    timestamp: new Date('2023-10-27T10:45:00Z'),
    imageUrl: 'https://placehold.co/600x400.png',
  },
];
