<template>
  <button
    :class="`bg-${bgColor}${colorDepthSufix}
    font-bold
    text-${textColor}
    px-4
    py-3
    transition
    duration-300
    ease-in-out
    hover:bg-${hoverBgColor}${colorHoverDepthSufix}`"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { computed } from 'vue';

interface Iprops {
    bgColor: string;
    bgColorDepth: number;
    hoverBgColor: string;
    hoverBgColorDepth: number;
    textColor: string;
}

export default {
  props: {
    bgColor: {
      type: String,
      default: 'blue',
    },
    bgColorDepth: {
      type: Number,
      default: 500,
    },
    hoverBgColor: {
      type: String,
      default: 'blue',
    },
    hoverBgColorDepth: {
      type: Number,
      default: 600,
    },
    textColor: {
      type: String,
      default: 'white',
    },
  },
  setup(props: Readonly<Iprops>) {
    const colorDepthSufix = computed(() => (props.bgColorDepth === 0 ? '' : `-${props.bgColorDepth}`));
    const colorHoverDepthSufix = computed(() => (props.hoverBgColorDepth === 0 ? '' : `-${props.hoverBgColorDepth}`));

    return { colorDepthSufix, colorHoverDepthSufix };
  },

};
</script>
