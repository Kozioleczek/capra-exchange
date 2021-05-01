import { createApp } from 'vue';
import httpClient, { HTTP_CLIENT_INJECTION_KEY } from '@/http/index';
import App from './App.vue';

import './index.css';

createApp(App)
  .provide(HTTP_CLIENT_INJECTION_KEY, httpClient)
  .mount('#app');
