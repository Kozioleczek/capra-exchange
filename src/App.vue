<template>
  <div class="container h-screen mx-auto p-4">
    <div class="grid grid-cols-3">
      <div class="text-left">
        Test
      </div>
      <div class="text-center">
        Logo
      </div>
      <div class="inline-flex justify-end">
        <Cog
          height="10"
          width="10"
          class="my-auto mr-4"
        />
        <div class="my-auto">
          <Button
            bg-color="black"
            :bg-color-depth="0"
            hover-bg-color="gray"
            :hover-bg-color-depth="600"
            text-color="white"
          >
            Pobierz aplikację
          </Button>
        </div>
      </div>
    </div>

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
import ExchangeRates from '@/services';
import { onMounted } from 'vue';
import Cog from './components/icons/Cog.vue';
import Button from './components/elements/Button.vue';

export default {
  components: {
    Cog,
    Button,
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
