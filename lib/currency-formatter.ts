export function formatCurrency(amount: number, currency: string): string {
  const currencyMap: Record<string, { code: string; symbol: string }> = {
    USD: { code: "USD", symbol: "$" },
    EUR: { code: "EUR", symbol: "€" },
    GBP: { code: "GBP", symbol: "£" },
    $: { code: "USD", symbol: "$" },
    "€": { code: "EUR", symbol: "€" },
    "£": { code: "GBP", symbol: "£" },
  }

  const currencyInfo = currencyMap[currency] || { code: "USD", symbol: "$" }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyInfo.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    // Fallback formatting
    return `${currencyInfo.symbol}${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }
}
