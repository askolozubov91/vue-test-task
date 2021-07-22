import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index';
import { store } from './store/index';
import { maska } from 'maska';
import './index.scss';

const app = createApp(App);

app.use(router);
app.use(store);
app.directive('maska', maska);

router.isReady().then(() => app.mount('#app'));
