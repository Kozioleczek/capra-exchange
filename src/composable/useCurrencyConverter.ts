import { inject } from 'vue';
import httpClient, { HTTP_CLIENT_INJECTION_KEY } from '@/http';
import { CurrenciesKeysMap } from '@/const/currenciesISO';
import { UsageResponse, CurrencyResponse, CurrencyHistoricalResponse } from '@/types/index';

const API_BASE = 'https://free.currconv.com';
const API_KEY = process.env.VUE_APP_CURRENCY_API as string;

const API_SUFFIX = `&compact=ultra&apiKey=${API_KEY}`;

export default function useCurrencyConverter() {
  const $http = inject(HTTP_CLIENT_INJECTION_KEY, httpClient);

  const getConvertPair = async (currencyOne: CurrenciesKeysMap, currencyTwo: CurrenciesKeysMap) => {
    try {
      const query = `${currencyOne}_${currencyTwo},${currencyTwo}_${currencyOne}`;
      const response = await $http().get<CurrencyResponse>(`${API_BASE}/api/v7/convert?q=${query}${API_SUFFIX}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getHistoricalDataRange = async (currencyOne: CurrenciesKeysMap, currencyTwo: CurrenciesKeysMap, dateBegin: string, dateEnd: string) => {
    try {
      const query = `${currencyOne}_${currencyTwo},${currencyTwo}_${currencyOne}`;
      const response = await $http()
        .get<CurrencyHistoricalResponse>(`${API_BASE}/api/v7/convert?q=${query}&date=${dateBegin}&endDate=${dateEnd}${API_SUFFIX}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getAPIUsage = async () => {
    try {
      const response = await $http().get<UsageResponse>(`${API_BASE}/others/usage?apiKey=${API_KEY}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { getConvertPair, getHistoricalDataRange, getAPIUsage };
}
