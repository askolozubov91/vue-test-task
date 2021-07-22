<template>
  <div>
    <ActionsBar :title="actionsBarTitle"></ActionsBar>
    <form :name="formName" class="flex flex-col h-full p-4 pt-16 overflow-auto" @submit.prevent="createMethod">
      <div class="flex flex-row mb-4">
        <label
          v-for="(type, typeName) in types"
          :key="typeName"
          class="w-1/2 py-2 border border-black first:rounded-l last:rounded-r text-center"
          :class="{ 'bg-black text-white': typeName === state.type }"
        >
          <input class="hidden" type="radio" name="type" :value="typeName" v-model="state.type" />
          {{ type.label }}
        </label>
      </div>
      <div class="flex flex-row flex-nowrap overflow-hidden">
        <transition :name="transitionName">
          <div v-if="state.type === METHOD_CARD" class="w-full flex-shrink-0">
            <InputText
              :form-name="formName"
              :name="`${METHOD_CARD}_full_name`"
              label="Full name"
              v-model="state[METHOD_CARD].fullName"
            ></InputText>
            <InputText
              :form-name="formName"
              :name="`${METHOD_CARD}_number`"
              label="Card number"
              v-model="state[METHOD_CARD].number"
              mask="#### #### #### ####"
              placeholder="#### #### #### ####"
              input-mode="number"
            ></InputText>
            <InputText
              :form-name="formName"
              :name="`${METHOD_CARD}_expiry_date`"
              label="Expiry date"
              v-model="state[METHOD_CARD].expiryDate"
              mask="##/##"
              placeholder="##/##"
              input-mode="number"
            ></InputText>
          </div>
        </transition>
        <transition :name="transitionName">
          <div v-if="state.type === METHOD_ACCOUNT" class="w-full flex-shrink-0">
            <InputText
              :form-name="formName"
              :name="`${METHOD_ACCOUNT}_name`"
              label="Account name"
              v-model="state[METHOD_ACCOUNT].name"
            ></InputText>
            <InputText
              :form-name="formName"
              :name="`${METHOD_ACCOUNT}_number`"
              label="Account number"
              v-model="state[METHOD_ACCOUNT].number"
              mask="##########"
              placeholder="##########"
              input-mode="number"
            ></InputText>
            <InputText
              :form-name="formName"
              :name="`${METHOD_ACCOUNT}_bsb`"
              label="BSB"
              v-model="state[METHOD_ACCOUNT].bsb"
              mask="###-###"
              placeholder="###-###"
              input-mode="number"
            ></InputText>
          </div>
        </transition>
      </div>
      <ButtonSubmit class="mt-auto" :disabled="!isFilled" text="Save"></ButtonSubmit>
    </form>
  </div>
</template>

<script>
import { computed } from 'vue';
import ActionsBar from '../ActionsBar.vue';
import ButtonSubmit from '../Tools/Form/ButtonSubmit.vue';
import InputText from '../Tools/Form/InputText.vue';
import api, { METHOD_CARD, METHOD_ACCOUNT } from '/src/api/index';
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
    const types = {
      [METHOD_CARD]: {
        label: 'Card',
        title: 'New card',
      },
      [METHOD_ACCOUNT]: {
        label: 'Bank account',
        title: 'New bank account',
      },
    };
    const initialState = {
      type: METHOD_CARD,
      [METHOD_CARD]: {
        fullName: '',
        number: '',
        expiryDate: '',
      },
      [METHOD_ACCOUNT]: {
        name: '',
        number: '',
        bsb: '',
      },
    };
    const schema = yup.object().shape({
      type: yup.string().required(),
      [METHOD_CARD]: yup.object().when('type', {
        is: METHOD_CARD,
        then: yup.object().shape({
          fullName: yup.string().required(),
          number: yup
            .string()
            .matches(/(\d{4} ){3}\d{4}/)
            .required(),
          expiryDate: yup
            .string()
            .matches(/\d{2}\/\d{2}/)
            .required(),
        }),
      }),
      [METHOD_ACCOUNT]: yup.object().when('type', {
        is: METHOD_ACCOUNT,
        then: yup.object().shape({
          name: yup.string().required(),
          number: yup
            .string()
            .matches(/\d{10}/)
            .required(),
          bsb: yup
            .string()
            .matches(/\d{3}-\d{3}/)
            .required(),
        }),
      }),
    });
    const formName = 'method_create';
    const formData = useFormData(initialState, schema);
    const { state, isFilled } = formData;
    const transitionName = computed(() => (state.type === METHOD_ACCOUNT ? 'slide-left' : 'slide-right'));
    const actionsBarTitle = computed(() => types[state.type].title);

    const routerNavigation = useRouterNavigation();

    const createMethod = () => {
      api.createMethod({ type: state.type, ...formData.getRawStateCopy()[state.type] });
      formData.clear();
      routerNavigation.goBack();
    };

    return {
      METHOD_CARD,
      METHOD_ACCOUNT,
      formName,
      transitionName,
      actionsBarTitle,
      types,
      state,
      isFilled,
      createMethod,
    };
  },
};
</script>
