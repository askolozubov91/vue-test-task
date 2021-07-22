<template>
  <button class="py-4 rounded bg-black disabled:bg-gray-200 text-white" type="submit" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    text: String,
  },
};
</script>
