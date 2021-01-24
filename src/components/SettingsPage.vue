<template>
  <div
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
          @click="$emit('closeClicked')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Close from './icons/Close.vue';

export default {
  components: {
    Close,
  },
};
</script>

<style>

</style>
