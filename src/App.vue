<template>
  <div class="container h-screen mx-auto p-4">
    <Header />
    <Hero />
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import ExchangeRates from '@/services';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';

export default {
  components: {
    Header,
    Hero,
  },
  setup() {
    const exchangeRates = async () => {
      await ExchangeRates.fetchAvgRateCurrency().then((response) => console.log(response));
    };
    onMounted(exchangeRates);
  },

};
</script>

<style>
html, body {
    overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale ;
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
