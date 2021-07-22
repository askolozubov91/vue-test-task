<template>
  <div class="absolute top-0 left-0 flex flex-row items-center w-full h-12 border-b border-black">
    <div class="w-12 h-full">
      <button class="w-full h-full" type="button" @click="goBack">
        <IconLeftAngle class="my-4 mx-auto w-4 h-4" />
      </button>
    </div>
    <div class="mx-auto font-bold">{{ title }}</div>
    <div class="w-12 h-full">
      <button class="w-full h-full" v-if="addRouteName.length > 0" type="button" @click="goAdd">
        <IconAdd class="my-3 mx-auto w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import useRouterNavigation from '../composables/useRouterNavigation.js';
import IconLeftAngle from '/src/assets/icons/left-angle.svg';
import IconAdd from '/src/assets/icons/add.svg';

export default {
  props: {
    addRouteName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    IconLeftAngle,
    IconAdd,
  },
  setup(props) {
    const router = useRouter();
    const { goBack } = useRouterNavigation();

    const goAdd = () => {
      router.push({ name: props.addRouteName });
    };

    return {
      goBack,
      goAdd,
    };
  },
};
</script>
