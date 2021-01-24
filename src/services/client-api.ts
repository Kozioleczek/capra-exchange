import axios, {
  AxiosRequestConfig, AxiosInstance, AxiosError, AxiosResponse,
} from 'axios';

export default class ClientApi {
    public axios: AxiosInstance;

    constructor(config?: AxiosRequestConfig) {
      this.axios = axios.create(config);
      this.axios.interceptors.response.use(
        (response: AxiosResponse) => ClientApi.handleResponse(response),
        (error: AxiosError) => ClientApi.handleError(error),
      );

      this.axios.interceptors.request.use(
        (params: AxiosRequestConfig) => params,
        (error: AxiosError) => console.log(error),
      );
    }

    public async request<T>(url: string, params: AxiosRequestConfig): Promise<AxiosResponse<T>> {
      const defaultParams: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'access-control-allow-methods,access-control-allow-origin,content-type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
          Accept: 'application/json',
        },
        method: 'GET',
        data: null,
        url,
      };
      return this.axios.request({ ...defaultParams, ...params });
    }

    private static handleResponse(response: AxiosResponse) {
      console.log('[SUCCESS] ClientAPI: ', response);
      return response;
    }

    private static handleError(error: AxiosError): void {
      console.log('[ERROR] ClientAPI: ', error);
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.response?.headers);
      throw error;
    }
}
