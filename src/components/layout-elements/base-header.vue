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
        :status-prop="checkboxStatus"
        @checkbox-status="checkboxStatus = $event"
      />
    </div>
    <div class="text-center my-auto mx-auto">
      <img src="@/assets/logo.svg">
    </div>
    <div class="inline-flex justify-end">
      <Cog
        :height="10"
        :width="10"
        class="my-auto mr-4 cursor-pointer"
        @click="isSettingsPaneOpen = true"
      />
      <div class="my-auto">
        <div class="rounded-full border-2 border-green py-2 px-4">
          Pozostałe zapytania: {{ remainingRequests ? remainingRequests.usage : 'Loading...' }}/100
        </div>
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
import useCurrencyConverter from '@/hooks/useCurrencyConverter';
import { UsageResponse } from '@/types';
import Cog from '../icons/Cog.vue';
import Sun from '../icons/Sun.vue';
import Moon from '../icons/Moon.vue';
import SwitchButton from '../elements/SwitchButton.vue';
import SettingsPane from '../SettingsPage.vue';

export default defineComponent({
  components: {
    Cog,
    Sun,
    Moon,

    SwitchButton,
    SettingsPane,
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
