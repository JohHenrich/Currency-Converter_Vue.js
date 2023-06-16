/**
 * Convert the given amount from one currency to another.
 *
 * @param amount - The amount to convert.
 * @param fromCurrency - The currency to convert from.
 * @param toCurrency - The currency to convert to.
 * @returns The converted amount.
 * @throws If an error occurs during the conversion process.
 */
import axios from 'axios'

export async function convert (amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    // Fetch the exchange rates from the API based on the source currency
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    const exchangeRates = response.data.rates
    // Get the conversion rate for the target currency
    const rate = exchangeRates[toCurrency]
    // Perform the currency conversion
    const convertedAmount = (amount * rate).toFixed(2)
    return parseFloat(convertedAmount)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to convert currencies.')
  }
}
