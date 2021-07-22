import { computed, reactive, isReactive, toRaw } from 'vue';
import _ from 'lodash-es';

export default function useFormData(initialState, schema) {
  const state = isReactive(initialState) ? initialState : reactive(_.cloneDeep(initialState));

  const getRawStateCopy = () => _.cloneDeep(toRaw(state));

  const isFilled = computed(() => {
    try {
      schema.validateSync(state);
    } catch (e) {
      return false;
    }

    return true;
  });

  const clear = () => {
    _.merge(state, initialState);
  };

  return {
    state,
    getRawStateCopy,
    clear,
    isFilled,
  };
}
