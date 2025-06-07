import '@/assets/css/main.css';
import '@/assets/scss/styles.scss';
import Lara from '@primeuix/themes/lara';
import { createPinia } from 'pinia';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Skeleton from 'primevue/skeleton';

import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Lara,
  },
});

app.component('Card', Card);
app.component('Chart', Chart);
app.component('Skeleton', Skeleton);

app.mount('#app');
