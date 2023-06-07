// src/plugins/vuetify.js

import {createApp} from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

createApp.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
