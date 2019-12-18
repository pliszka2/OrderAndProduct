import { ExchangeRates, Rate } from './CurrencyCheckerInterface'

export class Price {
  constructor(public amount: number, public currency: Rate) {}

  public inBaseCurrency(exchangeRates: ExchangeRates) {
    return this.amount / exchangeRates.rates[this.currency]
  }
}
