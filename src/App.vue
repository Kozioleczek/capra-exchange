<template>
  <div class="container h-screen mx-auto p-4">
    <Header />
    <Hero />
    {{ currencyResponse }}
    {{ historicalResponse }}
    <div class="grid grid-cols-12 px-32 gap-20">
      <div class="col-span-6 bg-black dark:bg-secondary rounded-2xl p-10">
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
      <div class="col-span-6 bg-black dark:bg-secondary rounded-2xl p-10 h-1/2">
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
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import useCurrencyConverter from '@/hooks/useCurrencyConverter';
import { CurrencyResponse, CurrencyHistoricalResponse } from '@/types';
import Header from './components/layout-elements/base-header.vue';
import Hero from './components/layout-elements/base-hero.vue';
import Footer from './components/layout-elements/base-footer.vue';

export default {
  components: {
    Header,
    Hero,
    Footer,
  },
  setup() {
    const { getConvertPair, getHistoricalDataRange } = useCurrencyConverter();

    const currencyResponse = ref<CurrencyResponse | null>(null);
    const historicalResponse = ref<CurrencyHistoricalResponse | null>(null);

    onMounted(async () => {
      const response = await getConvertPair('USD', 'PLN');
      const res = await getHistoricalDataRange('USD', 'PLN', '2021-04-28', '2021-05-01');
      currencyResponse.value = response.data;
      historicalResponse.value = res.data;
    });

    return { currencyResponse, historicalResponse };
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
