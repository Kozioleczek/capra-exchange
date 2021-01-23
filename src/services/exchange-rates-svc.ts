import { AxiosResponse } from 'axios';
import ClientApi from './client-api';

export default class ExchangeRatesSvc extends ClientApi {
    private api: ClientApi;

    private readonly endpoint: string;

    constructor() {
      super();
      this.endpoint = 'https://cors-anywhere.herokuapp.com/http://api.nbp.pl/api/exchangerates/rates';
      this.api = new ClientApi();
    }

    public async fetchAvgRateCurrency(): Promise<AxiosResponse> {
      return this.api.request(`${this.endpoint}/a/chf`, {
        method: 'GET',
      });
    }
}
