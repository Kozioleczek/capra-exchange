<template>
  <header class="flex justify-between md:grid md:grid-cols-3 pt-5">
    <div class="inline-flex justify-start dark:text-white">
      <Sun
        v-if="!checkboxStatus"
        class="my-auto mr-4 h-7 w-7 xl:h-10 xl:w-10"
      />
      <Moon
        v-if="checkboxStatus"
        class="my-auto mr-4 h-7 w-7 xl:h-10 xl:w-10"
      />
      <SwitchButton
        class="my-auto"
        :status-prop="checkboxStatus"
        @checkbox-status="checkboxStatus = $event"
      />
    </div>
    <div class="text-center my-auto mx-auto hidden md:block">
      <Logo class="dark:text-white text-black " />
    </div>
    <div class="inline-flex justify-end">
      <Cog
        :height="10"
        :width="10"
        class="my-auto mr-4 cursor-pointer  text-black dark:text-white hidden md:block"
        @click="isSettingsPaneOpen = true"
      />
      <div class="my-auto">
        <div
          v-if="remainingRequests"
          class="rounded-full py-2 px-4 dark:text-white text-xs md:text-base"
          :class="remainingRequests.usage >= 100 ? 'bg-red-500 text-white' : 'border-2 border-green-400'"
        >
          <div v-if="remainingRequests.usage >= 100">
            Przekroczono limit zapytań
          </div>
          <div v-else>
            Pozostałe zapytania: {{ remainingRequests.usage }}/100
          </div>
        </div>
        <div
          v-else
          class="rounded-full w-full h-10 bg-gray-300 animation-pulse"
        />
      </div>
    </div>
  </header>
  <teleport to="body">
    <transition name="slide-fade">
      <SettingsPane
        v-if="isSettingsPaneOpen"
        @close-clicked="isSettingsPaneOpen = false"
      />
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  ref, defineComponent, watch, onMounted,
} from 'vue';
import useCurrencyConverter from '@/composable/useCurrencyConverter';
import { UsageResponse } from '@/types';
import Cog from '../icons/Cog.vue';
import Sun from '../icons/Sun.vue';
import Moon from '../icons/Moon.vue';
import SwitchButton from '../elements/SwitchButton.vue';
import SettingsPane from '../SettingsPage.vue';
import Logo from '../Logo.vue';

export default defineComponent({
  components: {
    Cog,
    Sun,
    Moon,
    SettingsPane,
    SwitchButton,
    Logo,
  },
  setup() {
    const checkboxStatus = ref(false);
    const isSettingsPaneOpen = ref(false);

    const { getAPIUsage } = useCurrencyConverter();
    const remainingRequests = ref<UsageResponse | null>(null);
    const isError = ref(false);

    onMounted(async () => {
      try {
        const response = await getAPIUsage();
        remainingRequests.value = response.data;
      } catch {
        isError.value = true;
      }
    });

    watch(checkboxStatus, (value) => {
      if (value) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });

    return {
      checkboxStatus, isSettingsPaneOpen, remainingRequests, isError,
    };
  },
});
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
