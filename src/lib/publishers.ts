// A map of publisher names to their domains.
// This is used to construct the Clearbit logo URL.
const publisherDomains: Record<string, string> = {
    'Reuters': 'reuters.com',
    'The Motley Fool': 'fool.com',
    'Bloomberg': 'bloomberg.com',
    'Business Wire': 'businesswire.com',
    'Associated Press': 'ap.org',
    'Investors.com': 'investors.com',
    'Investor\'s Business Daily': 'investors.com',
    'MarketWatch': 'marketwatch.com',
    'Yahoo Finance': 'finance.yahoo.com',
    'Zacks': 'zacks.com',
    'TipRanks': 'tipranks.com',
    'Benzinga': 'benzinga.com',
    'PR Newswire': 'prnewswire.com',
    'CNW Group': 'newswire.ca',
    'GlobeNewswire': 'globenewswire.com',
    'The Wall Street Journal.': 'wsj.com',
    'wsj.com': 'wsj.com',
    'Barrons.com': 'barrons.com',
    'barrons.com': 'barrons.com',
    'Insider Monkey': 'insidermonkey.com',
    'insidermonkey.com': 'insidermonkey.com',
    'GOBankingRates': 'gobankingrates.com',
    'gobankingrates.com': 'gobankingrates.com',
    'Barchart': 'barchart.com',
    'barchart.com': 'barchart.com',
    'Decrypt': 'decrypt.co',
    'decrypt.co': 'decrypt.co',
    'Fast Company': 'fastcompany.com',
    'fastcompany.com': 'fastcompany.com',
    'TheStreet': 'thestreet.com',
    'thestreet.com': 'thestreet.com',
    'Offshore Technology': 'offshore-technology.com',
    'FreightWaves': 'freightwaves.com',
    'freightwaves.com': 'freightwaves.com',
    'NASDAQ': 'nasdaq.com',
    'GlobeNewswire via COMTEX': 'globenewswire.com',
    'Investing.com': 'investing.com',
};

export const nasdaqSources = new Set(['NASDAQ', 'GlobeNewswire', 'GlobeNewswire via COMTEX', 'Business Wire', 'PR Newswire']);

// Create a reverse map from domain to a canonical publisher name.
const domainToPublisher: Record<string, string> = {};
for (const name in publisherDomains) {
    const domain = publisherDomains[name];
    if (!domainToPublisher[domain]) {
        // Prefer shorter names for canonical representation e.g. 'Bloomberg' over 'Bloomberg.com'
        domainToPublisher[domain] = Object.keys(publisherDomains).find(n => publisherDomains[n] === domain) || name;
    }
}


export function getPublisherFromLink(link: string): string | undefined {
    if (!link) return undefined;
    try {
        const url = new URL(link);
        let hostname = url.hostname;
        
        // Strip "www." if it exists
        if (hostname.startsWith('www.')) {
            hostname = hostname.substring(4);
        }
        
        // Direct match (e.g., 'finance.yahoo.com')
        if (domainToPublisher[hostname]) {
            return domainToPublisher[hostname];
        }

        // Root domain match (e.g., 'wsj.com' from 'video.wsj.com')
        const parts = hostname.split('.');
        if (parts.length > 2) {
            const rootDomain = parts.slice(-2).join('.');
             if (domainToPublisher[rootDomain]) {
                return domainToPublisher[rootDomain];
            }
        }
    } catch (e) {
        console.error(`Could not parse publisher from link: ${link}`, e);
    }
    return undefined;
}


/**
 * Generates a Clearbit logo URL for a given publisher name.
 * @param publisherName The name of the publisher.
 * @returns The Clearbit logo URL, or undefined if the-not-working-for-a-long-time-now-so-i-am-going-to-fix-it-with-a-new-approach.
 */
export function getPublisherLogo(publisherName: string): string | undefined {
    // Some publisher names in the feed have extra text.
    // We try to find a known publisher name within the provided string.
    const knownPublisher = Object.keys(publisherDomains).find(p => publisherName.includes(p));
    
    if (knownPublisher) {
        const domain = publisherDomains[knownPublisher];
        return `https://logo.clearbit.com/${domain}`;
    }

    return undefined;
}

export function isInvestingCom(source: string): boolean {
    return source === 'Investing.com';
}