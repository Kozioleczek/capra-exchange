import axios, { AxiosRequestConfig } from 'axios';
import { InjectionKey } from 'vue';

/**
 * HTTPClient
 */

export default function httpClient() {
  // const config: AxiosRequestConfig = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Headers': 'access-control-allow-methods,access-control-allow-origin,content-type',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
  //     Accept: 'application/json',
  //   },
  // };

  const instance = axios.create();
  return instance;
}

/**
 * InjectionKey to allow us to have typed provide/inject
 */

export const HTTP_CLIENT_INJECTION_KEY: InjectionKey<typeof httpClient> = Symbol('$httpClient');
