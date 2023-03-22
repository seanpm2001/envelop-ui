import { createApp } from 'vue';
import { createHead } from 'unhead';

import App from '@/App.vue';
import router from '@/router';

import '@/assets/style.scss';

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

app.mount('#app');
