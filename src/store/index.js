import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { CLEAR_PAYMENT, UPDATE_AMOUNT, UPDATE_CONTACT, UPDATE_METHOD } from './mutation-types';

export const store = createStore({
  state: () => {
    return {
      contact: {
        id: '',
        name: '',
      },
      method: {
        id: '',
        name: '',
      },
      amount: '',
    };
  },
  mutations: {
    [UPDATE_CONTACT](state, contact) {
      state.contact.id = contact.id;
      state.contact.name = contact.name;
    },
    [UPDATE_METHOD](state, method) {
      state.method.id = method.id;
      state.method.name = method.name;
    },
    [UPDATE_AMOUNT](state, amount) {
      state.amount = amount;
    },
    [CLEAR_PAYMENT](state) {
      state.contact.id = '';
      state.contact.name = '';
      state.method.id = '';
      state.method.name = '';
      state.amount = '';
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
