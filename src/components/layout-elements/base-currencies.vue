<template>
  <div
    v-if="!isError"
    class="flex px-32 gap-20"
  >
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
        <div
          v-if="!isLoading"
          class="flex gap-3 text-white"
        >
          <div class="text-6xl">
            <input
              ref="calculateRef"
              v-model="calculateValue"
              autofocus
              type="number"
              min="1"
              class="calculateValueInput"
              :style="{ width: (calculateValue.length + 1) * 1.75 + 'rem' }"
            >
          </div>
          <div class="text-2xl">
            <span>{{ firstCurrencySelected }}</span>
          </div>
        </div>
        <div
          v-else
          class="block bg-gray-300 rounded-lg animate-pulse w-2/3 h-12 mb-5"
        />

        <p
          v-if="!isLoading"
          class="text-gray-300"
        >
          Kurs: 1 {{ firstCurrencySelected }} = {{ transformedCurrencyRatio[0] }} {{ secondCurrencySelected }}
        </p>
        <div
          v-else
          class="block bg-gray-300 rounded-lg animate-pulse w-1/3 h-5"
        />
      </div>
      <div class="related mb-10">
        <p class="font-bold text-white mb-3">
          Proponowane pary walutowe:
        </p>
        <div class="flex gap-5  flex-wrap">
          <div
            v-for="(pair, index) in suggestedPairs"
            :key="index"
            :class="pair === firstCurrencySelected && 'hidden'"
          >
            <div
              class="flex p-2 gap-1 border border-white rounded-full hover:bg-white hover:text-black text-white cursor-pointer"
              @click="secondCurrencySelected = pair"
            >
              <div
                v-if="flagForCodeExist(firstCurrencySelected.toLowerCase())"
                class="rounded-full block h-5 w-5 my-auto flag"
                :style="{ backgroundImage: 'url(' + require(`@/assets/square-flags/${firstCurrencySelected.toLowerCase()}.svg`) + ')'}"
              />
              <div
                v-else
                class="rounded-full block h-5 w-5 my-auto bg-gray-300"
              />
              <span class="text-md my-auto">{{ firstCurrencySelected }}</span>
              <span class="my-auto">→</span>
              <span class="text-md my-auto">{{ pair }}</span>
              <div
                class="rounded-full block h-5 w-5 my-auto flag"
                :style="{ backgroundImage: 'url(' + require(`@/assets/square-flags/${pair.toLowerCase()}.svg`) + ')'}"
              />
            </div>
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
          <div
            v-if="!isLoading"
            class=" text-white flex gap-3"
          >
            <div class="text-6xl">
              {{ (calculateValue*transformedCurrencyRatio[0]).toFixed(2) }}
            </div>
            <div class="text-2xl">
              <span>{{ secondCurrencySelected }}</span>
            </div>
          </div>
          <div
            v-else
            class="block bg-gray-300 rounded-lg animate-pulse w-2/3 h-12 mb-5"
          />

          <p
            v-if="!isLoading"
            class="text-gray-300"
          >
            Kurs: 1 {{ secondCurrencySelected }} = {{ transformedCurrencyRatio[1] }} {{ firstCurrencySelected }}
          </p>
          <div
            v-else
            class="block bg-gray-300 rounded-lg animate-pulse w-1/3 h-5"
          />
        </div>
      </div>
      <div
        class="rounded-2xl border-2 border-black p-5 dark:bg-secondary h-1/2"
      >
        <ApexChart
          v-if="chartOptions.xaxis.categories.length > 0"
          class="my-auto"
          height="250"
          type="line"
          :series="series"
          :options="chartOptions"
        />
      </div>
    </div>
  </div>
  <div
    v-else
    class="block text-center p-10"
  >
    <img
      :src="require('@/assets/server-down.svg')"
      class="w-1/3 h-auto mx-auto mb-10"
    >
    <h1
      v-if="errorCode === 400"
      class="font-bold text-3xl dark:text-white"
    >
      Oops! Pula darmowych zapytań została wyczerpana
    </h1>
    <h1
      v-else
      class="font-bold text-3xl dark:text-white"
    >
      Oops! Wystąpił nieznany błąd.
    </h1>
    <p class="text-xl dark:text-white">
      Spróbuj ponowanie później
    </p>
  </div>
</template>
<script lang="ts">
import {
  onMounted, ref, reactive, watch,
} from 'vue';
import useCurrencyConverter from '@/composable/useCurrencyConverter';
import { CurrencyResponse, CurrencyHistoricalResponse } from '@/types';
import ApexChart from 'vue3-apexcharts';
import Multiselect from '@vueform/multiselect';
import { currencies as currenciesISO, SingleCurrency, CurrenciesKeysMap } from '@/const/currenciesISO';
import availableSquareFlags from '@/const/availableSquareFlags';
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

    const isError = ref(false);
    const errorCode = ref(0);

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
        text: 'Zmiana kursu waluty',
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

    // Fetch first pair data
    const fetchData = async (firstCurrency: string, secondCurrency: string) => {
      isLoading.value = true;
      chartOptions.xaxis.categories = [...[]];
      try {
        const response = await getConvertPair(firstCurrency as CurrenciesKeysMap, secondCurrency as CurrenciesKeysMap);
        const res = await getHistoricalDataRange(firstCurrency as CurrenciesKeysMap, secondCurrency as CurrenciesKeysMap, '2021-04-24', '2021-05-01');
        currencyResponse.value = response.data;
        historicalResponse.value = res.data;
      } catch (error) {
        isError.value = true;
        errorCode.value = error.response.status;
      } finally {
        adjustsCurrencyResponse();
        isLoading.value = false;
      }
    };

    // Thanks to below ref we adding focus on input onMounted
    const calculateRef = ref<HTMLInputElement|null>(null);

    // Fetch first pair data
    onMounted(async () => {
      await fetchData('PLN', 'EUR');
      if (calculateRef.value !== null) {
        calculateRef.value.focus();
      }
    });

    // When selected currencies changed and are !== null then fetchData
    watch([firstCurrencySelected, secondCurrencySelected], async (newValues) => {
      if (newValues[0] !== null && newValues[1] !== null) {
        await fetchData(firstCurrencySelected.value, secondCurrencySelected.value);
        console.log(newValues[0], newValues[1]);
      }
    });

    const series = ref<{name: string; data: number[]}[]>([]);

    watch(historicalResponse, () => {
      if (historicalResponse.value !== null && historicalResponse.value !== undefined) {
        series.value = [...[]];
        const firstElement = Object.keys(historicalResponse.value)[0];
        series.value.push({ name: firstElement, data: [] });
        const obj = historicalResponse.value[firstElement];
        Object.entries(obj).forEach(([date, price]) => {
          series.value[0].data.push(price);
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
      console.log(code, !!availableSquareFlags.find((c) => c === code));
      return !!availableSquareFlags.find((c) => c === code);
    };

    const calculateValue = ref(100);

    const suggestedPairs = ref(['USD', 'PLN', 'GBP', 'EUR', 'CZK']);

    return {
      calculateValue,
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
      isError,
      errorCode,
      calculateRef,
      isLoading,
      suggestedPairs,
    };
  },
};
</script>
<style lang="postcss">
.multiselect-input {
  border: none;
  height: 4rem;
}

.is-disabled .multiselect-input {
  cursor: not-allowed;
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

.is-disabled {
  cursor: not-allowed!important;
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

.calculateValueInput{
  background: transparent;
  color: white;
  min-width: 2rem;
  width: 7rem;
  max-width: 24rem;
  transition: width 0.25s;
}

.calculateValueInput::-webkit-outer-spin-button,
.calculateValueInput::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
