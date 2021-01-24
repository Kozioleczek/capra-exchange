<template>
  <div
    class="relative inline-block mr-2 align-middle select-none"
    style="width: 3.5rem"
  >
    <input
      id="toggle"
      v-model="status"
      type="checkbox"
      name="toggle"
      class="toggle-checkbox
       absolute block
       w-7 h-7 rounded-full
        bg-black
        border-4
        appearance-none
        cursor-pointer
        "
    >
    <label
      for="toggle"
      class="toggle-label block overflow-hidden h-7 rounded-full bg-gray-300 cursor-pointer"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';

export default {
  emits: ['checkboxStatus'],

  setup(props, { emit }) {
    const checkboxStatus: boolean = ref(false);

    const status = computed({
      get: () => checkboxStatus,
      set: (value) => emit('checkboxStatus', value),
    });

    return { checkboxStatus, status };
  },

};
</script>

<style scoped>
.toggle-checkbox:checked {
  /* @apply: right-0 border-green-400; */
  transition-property: transform;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  transform: translateX(100%);
  border-color: #68D391;
}

.toggle-checkbox {
    transition-property: transform;
  transition-timing-function: ease-in;
  transition-duration: 0.2s;
  transform: translateX(0%);
}

/* #68D391 */
.toggle-checkbox:checked + .toggle-label {
  /* @apply: bg-green-400; */
  background-color: #68D391;
  transition: background-color 200ms linear;
}

</style>
