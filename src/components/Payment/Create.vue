<template>
  <div>
    <form :name="formName" class="h-full flex flex-col p-4" @submit.prevent="createPayment">
      <h1 class="text-2xl text-center mb-8">Make a payment</h1>
      <EntitySelect
        :form-name="formName"
        name="contact_name"
        label="Select contact"
        :text="state.contact.name"
        select-route-name="contact-list"
      ></EntitySelect>
      <EntitySelect
        :form-name="formName"
        name="method_name"
        label="Select payment method"
        :text="state.method.name"
        select-route-name="method-list"
      ></EntitySelect>
      <InputText
        :form-name="formName"
        name="amount"
        label="Enter amount"
        :model-value="state.amount"
        @update:model-value="[UPDATE_AMOUNT]"
        mask="#*"
        input-type="number"
      ></InputText>
      <ButtonSubmit class="mt-auto" :disabled="!isFilled" text="Pay"></ButtonSubmit>
    </form>
  </div>
</template>

<script>
import { useStore, mapMutations } from 'vuex';
import ButtonSubmit from '../Tools/Form/ButtonSubmit.vue';
import EntitySelect from '../Tools/Form/EntitySelect.vue';
import InputText from '../Tools/Form/InputText.vue';
import useFormData from '/src/composables/useFormData.js';
import { UPDATE_AMOUNT, CLEAR_PAYMENT } from '../../store/mutation-types.js';
import * as yup from 'yup';
import api from '/src/api/index';
import { useRouter } from 'vue-router';

export default {
  name: 'PaymentCreate',
  components: {
    ButtonSubmit,
    InputText,
    EntitySelect,
  },
  methods: {
    ...mapMutations({
      UPDATE_AMOUNT,
    }),
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const schema = yup.object({
      contact: yup.object({
        id: yup.number().integer().moreThan(-1).required(),
      }),
      method: yup.object({
        id: yup.number().integer().moreThan(-1).required(),
      }),
      amount: yup.number().integer().positive().required(),
    });
    const formName = 'payment-create';
    const formData = useFormData(store.state, schema);
    const { state, isFilled } = formData;

    const createPayment = () => {
      api.createPayment(formData.getRawStateCopy());
      store.commit(CLEAR_PAYMENT); // can't use formData.clear() because local state is readonly Vuex state object
      router.push({ name: 'payment-success' });
    };

    return {
      formName,
      state,
      isFilled,
      createPayment,
    };
  },
};
</script>

<style scoped></style>
