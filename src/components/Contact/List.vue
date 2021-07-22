<template>
  <div>
    <ActionsBar title="Select contact" add-route-name="contact-create"></ActionsBar>
    <div class="h-full p-4 pt-16 overflow-auto">
      <button
        v-for="contact in contacts"
        :key="contact.id"
        class="mb-4 last:mb-0 w-full p-2 px-4 border border-black rounded text-left"
        type="button"
        @click="selectContact(contact)"
        :class="[contact.isCurrent ? 'bg-black text-white' : 'bg-white text-black']"
      >
        <span class="text-lg capitalize">{{ getContactFullName(contact) }}</span>
        <br />
        <span class="text-gray-400">{{ contact.email }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import ActionsBar from '../ActionsBar.vue';
import { UPDATE_CONTACT } from '/src/store/mutation-types';
import api from '/src/api/index';
import useRouterNavigation from '../../composables/useRouterNavigation.js';
import { computed } from 'vue';

export default {
  components: {
    ActionsBar,
  },
  setup() {
    const store = useStore();
    const routerNavigation = useRouterNavigation();

    const contactsFromApi = api.getContacts();
    const contacts = computed(() =>
      contactsFromApi.map((contact) => ({ ...contact, isCurrent: contact.id === store.state.contact.id }))
    );

    const getContactFullName = (contact) => [contact.firstName, contact.lastName].join(' ');

    const selectContact = (contact) => {
      store.commit(UPDATE_CONTACT, {
        id: contact.id,
        name: getContactFullName(contact),
      });
      routerNavigation.goBack();
    };

    return {
      contacts,
      selectContact,
      getContactFullName,
    };
  },
};
</script>

<style scoped></style>
