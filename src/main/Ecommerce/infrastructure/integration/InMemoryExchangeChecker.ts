import { ExchangeRatesCheckerInterface } from '../../common/CurrencyCheckerInterface'

export class InMemoryExchangeRateChecker
  implements ExchangeRatesCheckerInterface {
  public getLatest() {
    return Promise.resolve({
      rates: {
        CAD: 1.4712,
        HKD: 8.7062,
        ISK: 137,
        PHP: 56.441,
        DKK: 7.4731,
        HUF: 328.85,
        CZK: 25.508,
        AUD: 1.6159,
        RON: 4.7795,
        SEK: 10.449,
        IDR: 15626.84,
        INR: 79.061,
        BRL: 4.5664,
        RUB: 69.993,
        HRK: 7.4398,
        JPY: 122.43,
        THB: 33.729,
        CHF: 1.0982,
        SGD: 1.5106,
        PLN: 4.2726,
        BGN: 1.9558,
        TRY: 6.4822,
        CNY: 7.79,
        NOK: 10.063,
        NZD: 1.6873,
        ZAR: 16.1393,
        USD: 1.1174,
        MXN: 21.2518,
        ILS: 3.8894,
        GBP: 0.83508,
        KRW: 1308.97,
        MYR: 4.6199,
      },
      base: 'EUR',
      date: '2019-12-13',
    })
  }
}
