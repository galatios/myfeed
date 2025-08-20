// A map of publisher names to their domains.
// This is used to construct the Clearbit logo URL.
const publisherDomains: Record<string, string> = {
    'Reuters': 'reuters.com',
    'The Motley Fool': 'fool.com',
    'Bloomberg': 'bloomberg.com',
    'Business Wire': 'businesswire.com',
    'Associated Press': 'ap.org',
    'Investors.com': 'investors.com',
    'MarketWatch': 'marketwatch.com',
    'Yahoo Finance': 'yahoo.com',
    'Zacks': 'zacks.com',
    'TipRanks': 'tipranks.com',
    'Benzinga': 'benzinga.com',
    'PR Newswire': 'prnewswire.com',
    'CNW Group': 'newswire.ca',
    'GlobeNewswire': 'globenewswire.com',
    'The Wall Street Journal.': 'wsj.com',
    'Barrons.com': 'barrons.com',
    'Insider Monkey': 'insidermonkey.com',
    'GOBankingRates': 'gobankingrates.com',
    'Investor\'s Business Daily': 'investors.com',
    'Barchart': 'barchart.com',
    'Decrypt': 'decrypt.co',
    'Fast Company': 'fastcompany.com',
    'TheStreet': 'thestreet.com',
    'Offshore Technology': 'offshore-technology.com',
    'FreightWaves': 'freightwaves.com',
};

/**
 * Generates a Clearbit logo URL for a given publisher name.
 * @param publisherName The name of the publisher.
 * @returns The Clearbit logo URL, or undefined if the domain is not found.
 */
export function getPublisherLogo(publisherName: string): string | undefined {
    // Some publisher names in the feed have extra text, like 'From Barrons.com'.
    // We try to find a known publisher name within the provided string.
    const knownPublisher = Object.keys(publisherDomains).find(p => publisherName.includes(p));
    
    if (knownPublisher) {
        const domain = publisherDomains[knownPublisher];
        return `https://logo.clearbit.com/${domain}`;
    }

    return undefined;
}
