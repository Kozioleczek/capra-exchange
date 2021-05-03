<template>
  <div class="flex px-32 gap-20">
    <div class="w-1/2 bg-black dark:bg-secondary rounded-2xl p-10">
      <div class="flex justify-between">
        <Multiselect
          v-model="firstCurrencySelected"
          :disabled="isLoading"
          class="w-full"
          :options="selectOptions"
          :searchable="true"
          track-by="code"
          label="code"
          :can-deselect="false"
          value-prop="code"
          :max-height="320"
          @open="showSearchInfoFirst = true"
          @close="showSearchInfoFirst = false"
        >
          <template #singlelabel="{ value}">
            <div
              v-if="!showSearchInfoFirst"
              class="custom-single-label flex gap-5 pl-0"
            >
              <div
                v-if="flagForCodeExist(value.code.toLowerCase())"
                class="rounded-full block h-14 w-14 my-auto flag"
                :style="{ backgroundImage: 'url(' + require(`@/assets/square-flags/${value.code.toLowerCase()}.svg`) + ')'}"
              />
              <div
                v-else
                class="rounded-full block h-14 w-14 my-auto bg-gray-300 flag"
              />
              <div class="block my-auto">
                <p class=" font-bold text-2xl">
                  {{ value.code }}
                </p>
                <p>
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
        <p
          v-if="!isLoading"
          class="text-6xl text-white"
        >
          {{ transformedCurrencyRatio[0] }}
          {{ firstCurrencySelected }}
        </p>
        <div
          v-else
          class="block bg-gray-300 rounded-lg animate-pulse w-2/3 h-12 mb-5"
        />

        <p
          v-if="!isLoading"
          class="text-gray-300"
        >
          Kurs: 1 PLN = 0.27 USD
        </p>
        <div
          v-else
          class="block bg-gray-300 rounded-lg animate-pulse w-1/3 h-5"
        />
      </div>
      <div class="related mb-10">
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
          <Multiselect
            v-model="secondCurrencySelected"
            :disabled="isLoading"
            class="w-full"
            :options="selectOptions"
            :searchable="true"
            track-by="code"
            label="code"
            :can-deselect="false"
            value-prop="code"
            :max-height="320"
            @open="showSearchInfoSecond = true"
            @close="showSearchInfoSecond = false"
          >
            <template #singlelabel="{ value}">
              <div
                v-if="!showSearchInfoSecond "
                class="custom-single-label flex gap-5 pl-0"
              >
                <div
                  v-if="flagForCodeExist(value.code.toLowerCase())"
                  class="rounded-full block h-14 w-14 my-auto flag"
                  :style="{ backgroundImage: 'url(' + require(`@/assets/square-flags/${value.code.toLowerCase()}.svg`) + ')'}"
                />
                <div
                  v-else
                  class="rounded-full block h-14 w-14 my-auto bg-gray-300"
                />
                <div class="block my-auto">
                  <p class=" font-bold text-2xl">
                    {{ value.code }}
                  </p>
                  <p>
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
        <div class="money my-14">
          <p
            v-if="!isLoading"
            class="text-6xl text-white"
          >
            {{ transformedCurrencyRatio[1] }}
            {{ secondCurrencySelected }}
          </p>
          <div
            v-else
            class="block bg-gray-300 rounded-lg animate-pulse w-2/3 h-12 mb-5"
          />

          <p
            v-if="!isLoading"
            class="text-gray-300"
          >
            Kurs: 1 PLN = 0.27 USD
          </p>
          <div
            v-else
            class="block bg-gray-300 rounded-lg animate-pulse w-1/3 h-5"
          />
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
  onMounted, ref, reactive, watch, computed,
} from 'vue';
import useCurrencyConverter from '@/hooks/useCurrencyConverter';
import { CurrencyResponse, CurrencyHistoricalResponse } from '@/types';
import ApexChart from 'vue3-apexcharts';
import Multiselect from '@vueform/multiselect';
import { currencies as currenciesISO, SingleCurrency, CurrenciesKeysMap } from '@/const/currenciesISO';
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

    const firstCurrencySelected = ref<string>('PLN');
    const secondCurrencySelected = ref<string>('EUR');

    const isLoading = ref(true);

    // Fetch first pair data
    onMounted(async () => {
      const response = await getConvertPair('PLN', 'EUR');
      const res = await getHistoricalDataRange('PLN', 'EUR', '2021-04-24', '2021-05-01');
      currencyResponse.value = response.data;
      console.log('cur', currencyResponse.value);
      historicalResponse.value = res.data;
      isLoading.value = false;
    });

    // Fetch first pair data
    const fetchData = async (firstCurrency: string, secondCurrency: string) => {
      isLoading.value = true;
      const response = await getConvertPair(firstCurrency as CurrenciesKeysMap, secondCurrency as CurrenciesKeysMap);
      const res = await getHistoricalDataRange(firstCurrency as CurrenciesKeysMap, secondCurrency as CurrenciesKeysMap, '2021-04-24', '2021-05-01');
      currencyResponse.value = response.data;
      historicalResponse.value = res.data;
      isLoading.value = false;
    };

    // i: 0 -> first currency i: 1 -> second
    const transformedCurrencyRatio = ref<number[]>([]);

    // Transform response into array
    const adjustsCurrencyResponse = () => {
      if (currencyResponse.value !== null) {
        transformedCurrencyRatio.value = [...[]];
        Object.entries(currencyResponse.value).forEach(([key, ratio]) => {
          transformedCurrencyRatio.value.push(ratio);
        });
      }
    };

    // When selected currencies changed and are !== null then fetchData
    watch([firstCurrencySelected, secondCurrencySelected], async (newValues) => {
      if (newValues[0] !== null && newValues[1] !== null) {
        await fetchData(firstCurrencySelected.value, secondCurrencySelected.value);
        adjustsCurrencyResponse();
        console.log(newValues[0], newValues[1]);
      }
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
        series.push({ name: firstElement, data: [] });
        const obj = historicalResponse.value[firstElement];
        Object.entries(obj).forEach(([date, price]) => {
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

    const showSearchInfoFirst = ref(false);
    const showSearchInfoSecond = ref(false);

    const flagForCodeExist = (code: string) => {
      // eslint-disable-next-line max-len
      const availableCodes = ['aed', 'ars', 'aud', 'bdt', 'bgn', 'brl', 'bwp', 'cad', 'chf', 'clp', 'cny', 'crc', 'czk', 'dkk', 'edp', 'eur', 'fjd', 'gbp', 'gel', 'ghs', 'hkd', 'hrk', 'huf', 'idr', 'ils', 'inr', 'jpy'];
      return !!availableCodes.find((c) => c === code);
    };

    return {
      currencyResponse,
      historicalResponse,
      chartOptions,
      series,
      selectOptions,
      firstCurrencySelected,
      transformedCurrencyRatio,
      secondCurrencySelected,
      showSearchInfoFirst,
      showSearchInfoSecond,
      flagForCodeExist,
      isLoading,
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
    color: theme('colors.white')
}

.is-disabled .custom-single-label {
  color: theme('colors.gray.300');
}

.is-disabled .flag {
      -webkit-animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.multiselect-options{
  top: 5rem;
}
.flag {
    background-size: cover;
}

.is-disabled .multiselect-input {
  background: transparent;
}
</style>