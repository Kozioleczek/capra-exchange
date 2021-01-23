<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/about">
      About
    </router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import ExchangeRates from '@/services';
import { onMounted } from 'vue';

export default {
  setup() {
    const exchangeRates = async () => {
      await ExchangeRates.fetchAvgRateCurrency().then((response) => console.log(response));
    };
    onMounted(exchangeRates);
  },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale ;
  text-align: center;
  color: #2c3e50;
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
