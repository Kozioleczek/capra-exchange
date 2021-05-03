import axios, { AxiosRequestConfig } from 'axios';
import { InjectionKey } from 'vue';

/**
 * HTTPClient
 */

export default function httpClient() {
  const instance = axios.create();
  return instance;
}

/**
 * InjectionKey to allow us to have typed provide/inject
 */

export const HTTP_CLIENT_INJECTION_KEY: InjectionKey<typeof httpClient> = Symbol('$httpClient');
