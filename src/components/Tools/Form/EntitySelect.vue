<template>
  <div class="flex flex-col mb-4">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      class="rounded"
      type="text"
      :name="name"
      :value="text === '' ? 'Not selected' : text"
      readonly
      @click="goSelect"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    modelValue: String,
    formName: String,
    name: String,
    label: String,
    text: String,
    selectRouteName: String,
  },
  setup(props) {
    const router = useRouter();

    const id = computed(() => `${props.formName}_${props.name}`);
    const goSelect = () => router.push({ name: props.selectRouteName });

    return {
      id,
      goSelect,
    };
  },
};
</script>
