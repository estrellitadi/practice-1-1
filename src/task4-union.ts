// Тип валюты — только три варианта
export type Currency = "RUB" | "USD" | "EUR";

// Курсы конвертации (упрощенно, относительно RUB):
// 1 USD = 90 RUB
// 1 EUR = 100 RUB

export function convert(amount: number, from: Currency, to: Currency): number {
  if (from === to) {
    return amount;
  }

  // 1. Переводим исходную валюту в RUB
  let amountInRub = amount;
  if (from === "USD") {
    amountInRub = amount * 90;
  } else if (from === "EUR") {
    amountInRub = amount * 100;
  }

  // 2. Переводим из RUB в целевую валюту
  if (to === "USD") {
    return amountInRub / 90;
  }
  if (to === "EUR") {
    return amountInRub / 100;
  }

  return amountInRub;
}

export function formatCurrency(amount: number, currency: Currency): string {
  return `${amount} ${currency}`;
}