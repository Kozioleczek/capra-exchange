<template>
  <div class="container h-screen mx-auto p-4">
    <Header />

    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import ExchangeRates from '@/services';
import Header from './components/Header.vue';

export default {
  components: {
    Header,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale ;
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
