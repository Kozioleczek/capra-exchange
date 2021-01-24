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
        class="my-auto mr-4 cursor-pointer"
        @click="isSettingsPaneOpen = true"
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
  <teleport to="body">
    <transition name="slide-fade">
      <div
        v-if="isSettingsPaneOpen"
        class="bg-black absolute h-screen p-10 top-0 right-0"
        style="width: 30rem"
      >
        <div class="grid grid-cols-2 flex justify-between">
          <span class="text-white text-3xl font-bold">Ustawienia</span>
          <div class="flex justify-end">
            <Close
              :height="10"
              :width="10"
              class="cursor-pointer"
              @click="isSettingsPaneOpen = false"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { ref } from 'vue';
import Cog from './icons/Cog.vue';
import Sun from './icons/Sun.vue';
import Moon from './icons/Moon.vue';
import Close from './icons/Close.vue';
import Button from './elements/Button.vue';
import SwitchButton from './elements/SwitchButton.vue';

export default {
  components: {
    Cog,
    Sun,
    Moon,
    Button,
    SwitchButton,
    Close,
  },
  setup() {
    const checkboxStatus = ref(false);
    const isSettingsPaneOpen = ref(false);

    return { checkboxStatus, isSettingsPaneOpen };
  },
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
