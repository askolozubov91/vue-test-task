<template>
  <div>
    <ActionsBar title="New contact"></ActionsBar>
    <form :name="formName" class="flex flex-col h-full overflow-auto p-4 pt-16" @submit.prevent="createContact">
      <InputText :form-name="formName" name="first_name" label="First name" v-model="state.firstName"></InputText>
      <InputText :form-name="formName" name="last_name" label="Last name" v-model="state.lastName"></InputText>
      <InputText :form-name="formName" name="email" label="Email" v-model="state.email"></InputText>
      <ButtonSubmit class="mt-auto" :disabled="!isFilled" text="Save"></ButtonSubmit>
    </form>
  </div>
</template>

<script>
import ActionsBar from '../ActionsBar.vue';
import ButtonSubmit from '../Tools/Form/ButtonSubmit.vue';
import InputText from '../Tools/Form/InputText.vue';
import api from '/src/api/index';
import useRouterNavigation from '/src/composables/useRouterNavigation.js';
import useFormData from '/src/composables/useFormData.js';
import * as yup from 'yup';

export default {
  components: {
    ActionsBar,
    ButtonSubmit,
    InputText,
  },
  setup() {
    const initialState = {
      firstName: '',
      lastName: '',
      email: '',
    };
    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
    });
    const formName = 'contact_create';
    const formData = useFormData(initialState, schema);
    const { state, isFilled } = formData;

    const routerNavigation = useRouterNavigation();

    const createContact = () => {
      api.createContact(formData.getRawStateCopy());
      formData.clear();
      routerNavigation.goBack();
    };

    return {
      formName,
      state,
      isFilled,
      createContact,
    };
  },
};
</script>
