import { defineNuxtModule } from '@nuxt/kit'
import path from 'path'
import getSiteMeta from './utils/getSiteMeta'
import { cloneDeep } from 'lodash'

const meta = getSiteMeta()

export default defineNuxtConfig({
  devServer: {},
  buildModules: [
    '@nuxt/postcss8'
  ]
})
