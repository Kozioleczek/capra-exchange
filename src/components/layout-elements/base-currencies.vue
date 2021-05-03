<template>
  <div class="flex px-32 gap-20">
    <div class="w-1/2 bg-black dark:bg-secondary rounded-2xl p-10">
      <div class="flex justify-between">
        <Multiselect
          v-model="firstCurrency"
          class="w-full"
          :options="selectOptions"
          :searchable="true"
          track-by="code"
          label="code"
          :can-deselect="false"
          value-prop="code"
          max-height="320"
          @open="showSearchInfo = true"
          @close="showSearchInfo = false"
        >
          <template #singlelabel="{ value}">
            <div
              v-if="!showSearchInfo"
              class="custom-single-label flex gap-5 pl-0"
            >
              <div class="rounded-full bg-gray-300 block h-14 w-14 my-auto" />
              <div class="block my-auto">
                <p class="text-white font-bold text-2xl">
                  {{ value.code }}
                </p>
                <p class="text-white">
                  {{ value.name }}
                </p>
              </div>
            </div>
            <div v-else>
              <span class="text-white">Search...</span>
            </div>
          </template>

          <template #option="{ option }">
            <div>
              {{ option.code }} {{ option.name }}
            </div>
          </template>
          <template #caret>
            <div class="my-auto custom-caret">
              <img src="@/assets/caret.svg">
            </div>
          </template>
        </Multiselect>
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
      <div class="related">
        <p class="font-bold text-white mb-3">
          Popularne pary kryptowalut:
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
</template>
<script lang="ts">
import {
  onMounted, ref, reactive, watch,
} from 'vue';
import useCurrencyConverter from '@/hooks/useCurrencyConverter';
import { CurrencyResponse, CurrencyHistoricalResponse } from '@/types';
import ApexChart from 'vue3-apexcharts';
import Multiselect from '@vueform/multiselect';
import { currencies as currenciesISO, SingleCurrency } from '@/const/currenciesISO';
import '@vueform/multiselect/themes/default.css';

export default {
  components: {
    ApexChart,
    Multiselect,
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

    const selectOptions = ref<SingleCurrency[]>([]);

    // create options for multiselect

    Object.entries(currenciesISO).forEach(([key, value]) => {
      selectOptions.value.push(value);
    });

    const firstCurrency = ref<string|null>('PLN');

    const showSearchInfo = ref(false);

    return {
      currencyResponse, historicalResponse, chartOptions, series, selectOptions, firstCurrency, showSearchInfo,
    };
  },
};
</script>
<style lang="postcss">
.multiselect-input {
  border: none;
  height: 4rem;
}
.multiselect-clear {
  display: none;
}

.is-open .custom-caret{
      transform: translateY(-50%) rotate(180deg);
}

.custom-caret {
    position: absolute;
    right: 12px;
    top: 50%;
    content: "";
    transform: translateY(-50%);
    transition: transform .3s;
}
.multiselect-search{
  @apply text-white
}
.custom-single-label {
  display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    background: transparent;

}
.multiselect-options{
  top: 5rem;
}
</style>
