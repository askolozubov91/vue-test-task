<template>
  <div>
    <ActionsBar title="Select method" add-route-name="method-create"></ActionsBar>
    <div class="h-full p-4 pt-16 overflow-auto">
      <template v-if="cards.length > 0">
        <h2 class="text-xl mb-4">Credit/debit cards</h2>
        <div
          v-for="card in cards"
          :key="card.id"
          class="relative mb-4 last:mb-0 w-full p-4 pt-20 border-2 rounded border-black text-left"
          @click="selectMethod(card)"
          :class="[card.isCurrent ? 'bg-black text-white' : 'bg-white text-black']"
        >
          <div class="absolute top-4 left-4 w-16 h-8 rounded" :class="[card.isCurrent ? 'bg-white' : 'bg-black']"></div>
          <div class="absolute top-4 right-4">
            <div class="w-2 h-2 rounded-full" :class="[card.isCurrent ? 'bg-white' : 'bg-black']"></div>
            <div class="w-2 h-2 rounded-full mt-1" :class="[card.isCurrent ? 'bg-white' : 'bg-black']"></div>
            <div class="w-2 h-2 rounded-full mt-1" :class="[card.isCurrent ? 'bg-white' : 'bg-black']"></div>
          </div>
          <div class="text-lg">{{ card.fullName }}</div>
          <div class="mt-2">{{ getHiddenCardNumber(card.number) }}</div>
          <div class="absolute bottom-4 right-4">{{ card.expiryDate }}</div>
        </div>
      </template>
      <template v-if="accounts.length > 0">
        <h2 class="text-xl mt-4 mb-4">Bank accounts</h2>
        <div
          v-for="account in accounts"
          :key="account.id"
          class="relative mb-4 last:mb-0 w-full p-4 pb-20 border-2 rounded border-black text-left"
          @click="selectMethod(account)"
          :class="[account.isCurrent ? 'bg-black text-white' : 'bg-white text-black']"
        >
          <div class="absolute top-4 right-4">
            <div class="w-2 h-2 rounded-full" :class="[account.isCurrent ? 'bg-white' : 'bg-black']"></div>
            <div class="w-2 h-2 rounded-full mt-1" :class="[account.isCurrent ? 'bg-white' : 'bg-black']"></div>
            <div class="w-2 h-2 rounded-full mt-1" :class="[account.isCurrent ? 'bg-white' : 'bg-black']"></div>
          </div>
          <div class="text-lg">{{ account.name }}</div>
          <div class="mt-2">{{ account.number }}</div>
          <div class="absolute bottom-4 right-4">{{ account.bsb }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import ActionsBar from '../ActionsBar.vue';
import { UPDATE_METHOD } from '/src/store/mutation-types';
import api, { METHOD_CARD, METHOD_ACCOUNT } from '/src/api/index';
import useRouterNavigation from '../../composables/useRouterNavigation.js';
import { computed } from 'vue';

export default {
  components: {
    ActionsBar,
  },
  setup() {
    const store = useStore();
    const routerNavigation = useRouterNavigation();

    const getHiddenCardNumber = (number) => '**** ' + number.substr(-4);

    const methodsFromApi = api.getMethods();
    const methods = computed(() =>
      methodsFromApi.map((method) => ({ ...method, isCurrent: method.id === store.state.method.id }))
    );
    const cards = computed(() => methods.value.filter((method) => method.type === METHOD_CARD));
    const accounts = computed(() => methods.value.filter((method) => method.type === METHOD_ACCOUNT));

    const selectMethod = (method) => {
      store.commit(UPDATE_METHOD, {
        id: method.id,
        name: method.type === METHOD_CARD ? 'Card: ' + getHiddenCardNumber(method.number) : 'Account: ' + method.number,
      });
      routerNavigation.goBack();
    };

    return {
      cards,
      accounts,
      getHiddenCardNumber,
      selectMethod,
    };
  },
};
</script>

<style scoped></style>
