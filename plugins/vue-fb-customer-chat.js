
import { createApp } from 'vue';

import VueSocialChat from 'vue-social-chat'
import 'vue-social-chat/dist/style.css'
const app = createApp({});
app.use(VueSocialChat, {
  number: '2089062604669120',
  theme_color: '#333333',
  locale: 'en_US',
});
export default app;