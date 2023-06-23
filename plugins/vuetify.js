// src/plugins/vuetify.js
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';

import 'vuetify/dist/vuetify.min.css';

const app = createApp();

const vuetify = createVuetify();

app.use(vuetify);

app.mount('#app');

export default vuetify;

