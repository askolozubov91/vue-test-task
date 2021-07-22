<template>
  <div class="flex flex-col mb-4">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      class="rounded"
      v-maska="mask"
      type="text"
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    modelValue: String,
    formName: String,
    name: String,
    label: String,
    mask: String,
  },
  emits: ['update:modelValue'],
  setup(props) {
    const id = computed(() => `${props.formName}_${props.name}`);

    return {
      id,
    };
  },
};
</script>
