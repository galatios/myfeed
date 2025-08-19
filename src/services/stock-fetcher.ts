/**
 * @fileOverview A mock service for fetching stock prices.
 */

// In a real application, this would fetch from a live stock data API.
// For this prototype, we'll generate a realistic-looking mock price.
export function getMockStockPrice(ticker: string): number {
    // Simple hash function to get a somewhat consistent base for a ticker
    let hash = 0;
    for (let i = 0; i < ticker.length; i++) {
        const char = ticker.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }

    const basePrice = (Math.abs(hash) % 500) + 10; // Base price between $10 and $510
    const volatility = basePrice * 0.1; // 10% volatility
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1

    const price = basePrice + (randomFactor * volatility);
    
    return parseFloat(price.toFixed(2));
}
