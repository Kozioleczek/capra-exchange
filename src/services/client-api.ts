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
      return this.axios.request(params);
    }

    private static handleResponse(response: AxiosResponse) {
      // eslint-disable-next-line no-console
      console.log('[SUCCESS] ClientAPI: ', response);
      return response;
    }

    private static handleError(error: AxiosError): void {
      // eslint-disable-next-line no-console
      console.log('[ERROR] ClientAPI: ', error);
      throw error;
    }
}
