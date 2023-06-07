import {createApp} from 'vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const app = createApp({});
app.component('vue-select', vSelect)

export default app;