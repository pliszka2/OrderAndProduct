export interface ExchangeRatesCheckerInterface {
  getLatest(): Promise<ExchangeRates>
}

export interface ExchangeRates {
  rates: Rates
  base: string
  date: string
}

type Rates = {
  CAD: number
  HKD: number
  ISK: number
  PHP: number
  DKK: number
  HUF: number
  CZK: number
  AUD: number
  RON: number
  SEK: number
  IDR: number
  INR: number
  BRL: number
  RUB: number
  HRK: number
  JPY: number
  THB: number
  CHF: number
  SGD: number
  PLN: number
  BGN: number
  TRY: number
  CNY: number
  NOK: number
  NZD: number
  ZAR: number
  USD: number
  MXN: number
  ILS: number
  GBP: number
  KRW: number
  MYR: number
}
