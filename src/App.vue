<template>
  <div class="container h-screen mx-auto p-4">
    <Header />
    <Hero />
    <Currencies />
    <Footer />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import Currencies from '@/components/layout-elements/base-currencies.vue';
import Header from './components/layout-elements/base-header.vue';
import Hero from './components/layout-elements/base-hero.vue';
import Footer from './components/layout-elements/base-footer.vue';

export default defineComponent({
  components: {
    Header,
    Hero,
    Footer,
    Currencies,
  },
});
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
