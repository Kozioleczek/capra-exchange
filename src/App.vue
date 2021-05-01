<template>
  <div class="container h-screen mx-auto p-4">
    <Header />
    <Hero />
    <div class="flex px-32 gap-20">
      <div class="w-1/2 bg-black dark:bg-secondary rounded-2xl p-10">
        <div class="flex justify-between">
          <div class="flex gap-5">
            <div class="rounded-full bg-gray-300 block h-14 w-14 my-auto" />
            <div class="block my-auto">
              <p class="text-white font-bold text-2xl">
                PLN
              </p>
              <p class="text-white">
                Polski Złoty
              </p>
            </div>
          </div>
        </div>
        <div class="money my-16">
          <p class="text-6xl text-white">
            2137<span class="text-2xl">.00</span> PLN
          </p>
          <p class="text-gray-300">
            Kurs: 1 PLN = 0.27 USD
          </p>
        </div>
        <div class="related">
          <p class="font-bold text-white mb-3">
            Popularne pary walutowe:
          </p>
          <div class="flex gap-5">
            <div
              v-for="i in 4"
              :key="i"
              class="text-center"
            >
              <div class="rounded-full bg-gray-300 block h-14 w-14 mb-2" />
              <span class="text-white text-xl">BTC</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="bg-black dark:bg-secondary rounded-2xl p-10 h-1/2 mb-5">
          <div class="flex justify-between">
            <div class="flex gap-5">
              <div class="rounded-full bg-gray-300 block h-14 w-14 my-auto" />
              <div class="block my-auto">
                <p class="text-white font-bold text-2xl">
                  PLN
                </p>
                <p class="text-white">
                  Polski Złoty
                </p>
              </div>
            </div>
          </div>
          <div class="money my-7">
            <p class="text-6xl text-white">
              2137<span class="text-2xl">.00</span> PLN
            </p>
            <p class="text-gray-300">
              Kurs: 1 PLN = 0.27 USD
            </p>
          </div>
        </div>
        <div
          v-if="chartOptions.xaxis.categories.length > 0"
          class="rounded-2xl border-2 border-black p-5"
        >
          <ApexChart
            class="my-auto"
            height="250"
            type="line"
            :series="series"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import {
  onMounted, ref, reactive, watch,
} from 'vue';
import useCurrencyConverter from '@/hooks/useCurrencyConverter';
import { CurrencyResponse, CurrencyHistoricalResponse } from '@/types';
import ApexChart from 'vue3-apexcharts';
import Header from './components/layout-elements/base-header.vue';
import Hero from './components/layout-elements/base-hero.vue';
import Footer from './components/layout-elements/base-footer.vue';

export default {
  components: {
    Header,
    Hero,
    Footer,
    ApexChart,
  },
  setup() {
    const { getConvertPair, getHistoricalDataRange } = useCurrencyConverter();

    const currencyResponse = ref<CurrencyResponse | null>(null);
    const historicalResponse = ref<CurrencyHistoricalResponse | null>(null);

    onMounted(async () => {
      const response = await getConvertPair('USD', 'PLN');
      const res = await getHistoricalDataRange('USD', 'PLN', '2021-04-24', '2021-05-01');
      currencyResponse.value = response.data;
      console.log(res.data);
      historicalResponse.value = res.data;
    });

    const chartOptions = reactive({
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Currency trends',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [] as string[],
        labels: {
          show: false,
        },
      },
    });

    const series = reactive<{name: string; data: number[]}[]>([]);

    watch(historicalResponse, () => {
      if (historicalResponse.value !== null && historicalResponse.value !== undefined) {
        const firstElement = Object.keys(historicalResponse.value)[0];
        console.log(firstElement);
        series.push({ name: firstElement, data: [] });
        console.log('ser0', series[0].name, series[0].data);
        const obj = historicalResponse.value[firstElement];
        console.log(obj);
        Object.entries(obj).forEach(([date, price]) => {
          console.log('en', date, price);
          series[0].data.push(price);
          chartOptions.xaxis.categories.push(date);
        });
      }
    });

    return {
      currencyResponse, historicalResponse, chartOptions, series,
    };
  },
};
</script>

<style lang="postcss">
html,
body {
  overflow-x: hidden;
}

body.dark {
  background: theme('colors.deepBlack');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
