
import { createApp } from 'vue';
import { Vue3FBChat } from './vue3-fb-chat/dist/main'

const app = createApp({});
app.use(Vue3FBChat, {
  page_id: '2089062604669120',
  theme_color: '#333333',
  locale: 'en_US',
});
