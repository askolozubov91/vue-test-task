<template>
  <div>
    <div class="h-full flex flex-col p-4 pt-12">
      <IconCheck class="mx-auto w-36" />
      <div class="mt-8 text-xl text-center">Payment completed <br />successfully</div>
      <router-link
        class="mt-auto py-4 rounded bg-black text-white text-center disabled:bg-gray-200"
        :to="{ name: 'payment-create' }"
        >Make another one</router-link
      >
    </div>
  </div>
</template>

<script>
import IconCheck from '/src/assets/icons/check.svg';

export default {
  components: {
    IconCheck,
  },
};
</script>

<style scoped></style>
