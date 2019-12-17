export interface ExchangeRatesCheckerInterface {
  getLatest(): Promise<ExchangeRates>
}

export interface ExchangeRates {
  rates: Rates
  base: Rate
  date: string
}

export enum Rate {
  CAD = 'CAD',
  HKD = 'HKD',
  ISK = 'ISK',
  PHP = 'PHP',
  DKK = 'DKK',
  HUF = 'HUF',
  CZK = 'CZK',
  AUD = 'AUD',
  RON = 'RON',
  SEK = 'SEK',
  IDR = 'IDR',
  INR = 'INR',
  BRL = 'BRL',
  RUB = 'RUB',
  HRK = 'HRK',
  JPY = 'JPY',
  THB = 'THB',
  CHF = 'CHF',
  SGD = 'SGD',
  PLN = 'PLN',
  BGN = 'BGN',
  TRY = 'TRY',
  CNY = 'CNY',
  NOK = 'NOK',
  NZD = 'NZD',
  ZAR = 'ZAR',
  USD = 'USD',
  MXN = 'MXN',
  ILS = 'ILS',
  GBP = 'GBP',
  KRW = 'KRW',
  MYR = 'MYR',
  EUR = 'EUR',
}

export type Rates = {
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
  EUR: number
}
