<template>
  <header class="grid grid-cols-3 pt-5">
    <div class="inline-flex justify-start">
      <Sun
        v-if="!checkboxStatus"
        :height="10"
        :width="10"
        class="my-auto mr-4"
      />
      <Moon
        v-if="checkboxStatus"
        :height="10"
        :width="10"
        class="my-auto mr-4"
      />
      <SwitchButton
        class="my-auto"
        @checkbox-status="checkboxStatus = $event"
      />
    </div>
    <div class="text-center my-auto mx-auto">
      <img src="../assets/logo.svg">
    </div>
    <div class="inline-flex justify-end">
      <Cog
        :height="10"
        :width="10"
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
  </header>
</template>

<script lang="ts">
import { ref } from 'vue';
import Cog from './icons/Cog.vue';
import Sun from './icons/Sun.vue';
import Moon from './icons/Moon.vue';
import Button from './elements/Button.vue';
import SwitchButton from './elements/SwitchButton.vue';

export default {
  components: {
    Cog,
    Sun,
    Moon,
    Button,
    SwitchButton,
  },
  setup() {
    const checkboxStatus = ref(false);

    return { checkboxStatus };
  },
};
</script>

<style>

</style>
