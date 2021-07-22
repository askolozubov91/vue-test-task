import { createRouter, createWebHistory } from 'vue-router';
import PaymentCreate from '../components/Payment/Create.vue';
import PaymentSuccess from '../components/Payment/Success.vue';
import ContactList from '../components/Contact/List.vue';
import ContactCreate from '../components/Contact/Create.vue';
import MethodList from '../components/Method/List.vue';
import MethodCreate from '../components/Method/Create.vue';

const TRANSITION_TYPE_VERTICAL = 'TRANSITION_TYPE_VERTICAL';

const routes = [
  {
    path: '/',
    name: 'payment-create',
    component: PaymentCreate,
  },
  {
    path: '/contacts/',
    name: 'contact-list',
    component: ContactList,
  },
  {
    path: '/contacts/create/',
    name: 'contact-create',
    component: ContactCreate,
  },
  {
    path: '/methods/',
    name: 'method-list',
    component: MethodList,
  },
  {
    path: '/methods/create/',
    name: 'method-create',
    component: MethodCreate,
  },
  {
    path: '/success/',
    name: 'payment-success',
    component: PaymentSuccess,
    meta: {
      transitionType: TRANSITION_TYPE_VERTICAL,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (from.meta.transitionType === TRANSITION_TYPE_VERTICAL) {
    to.meta.transitionName = 'screen-change-up';
  } else if (to.meta.transitionType === TRANSITION_TYPE_VERTICAL) {
    to.meta.transitionName = 'screen-change-down';
  } else {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    to.meta.transitionName = toDepth < fromDepth ? 'screen-change-right' : 'screen-change-left';
  }
});
