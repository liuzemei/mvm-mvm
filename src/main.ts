import { createApp } from 'vue';
import App from './App.vue';
import { BigNumber } from 'bignumber.js';

BigNumber.config({ EXPONENTIAL_AT: [-100, 200] });
createApp(App).mount('#app');
