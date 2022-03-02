import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/_nuxt/403-2aa842f5.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-R7s/aI5jQ92bjpLbCEcJYvqTUFs\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/403-2aa842f5.mjs"
  },
  "/_nuxt/404-bd8d1a4d.mjs": {
    "type": "application/javascript",
    "etag": "\"1f5-sDZQskrwEM17uTUi5REe3qmstKc\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/404-bd8d1a4d.mjs"
  },
  "/_nuxt/503-da17169d.mjs": {
    "type": "application/javascript",
    "etag": "\"238-k+GKeVZY6pBjcc8EHC6tsKVSkvE\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/503-da17169d.mjs"
  },
  "/_nuxt/activitylog-ab0123e1.mjs": {
    "type": "application/javascript",
    "etag": "\"339-CJwhI16lkjAlLXbA1k20wYo8iCM\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/activitylog-ab0123e1.mjs"
  },
  "/_nuxt/administration-af1e0249.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-u4kF3mXfNdYRUrvfOY7aPlsC+SY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/administration-af1e0249.mjs"
  },
  "/_nuxt/auth-088a28c9.mjs": {
    "type": "application/javascript",
    "etag": "\"1ac-GRyP0O5+zn1dLvyZSwk+sOPu8RA\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/auth-088a28c9.mjs"
  },
  "/_nuxt/auth-6c10edc1.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3-sejOxciVJ9+rVu85AppETcplR7E\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/auth-6c10edc1.mjs"
  },
  "/_nuxt/calendar-c5a78cf6.mjs": {
    "type": "application/javascript",
    "etag": "\"44c-/GgTML3E7kieaAIdZLXy0usk5eU\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/calendar-c5a78cf6.mjs"
  },
  "/_nuxt/Checkmark.3a02cf8a.svg": {
    "type": "image/svg+xml",
    "etag": "\"483-IgmNcsPyMkH0iaSywhH9io0xMIs\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/Checkmark.3a02cf8a.svg"
  },
  "/_nuxt/colors.ab7bce47.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ea4-iEYJn2Y2dZxpuy8IJERCSZ2EOkE\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/colors.ab7bce47.css"
  },
  "/_nuxt/companies-e9f8d6c2.mjs": {
    "type": "application/javascript",
    "etag": "\"121-InHKWhrFMVYXkMu+ht9JHTquyUs\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/companies-e9f8d6c2.mjs"
  },
  "/_nuxt/configure-46a3be8e.mjs": {
    "type": "application/javascript",
    "etag": "\"71d-fdhgSomImHwXJ+RYy4o4W8BHEgg\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/configure-46a3be8e.mjs"
  },
  "/_nuxt/create-0564e2a2.mjs": {
    "type": "application/javascript",
    "etag": "\"1f0-A5Db27Sy4hUnhExRGt/2nEc6XJs\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-0564e2a2.mjs"
  },
  "/_nuxt/create-07b89a04.mjs": {
    "type": "application/javascript",
    "etag": "\"1f7-nDfivUdaScx65hcRjzwlAZMKQTc\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-07b89a04.mjs"
  },
  "/_nuxt/create-0dcb7c5e.mjs": {
    "type": "application/javascript",
    "etag": "\"1bc-BHxlzdJ1Xym2KASDS17qb/aR/eA\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-0dcb7c5e.mjs"
  },
  "/_nuxt/create-132d3dec.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-JCuNscUbb+/oAVR9a+VXl1YRvZw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-132d3dec.mjs"
  },
  "/_nuxt/create-16644651.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-rpRtV5iNDpCU4ggG30wk28cctfQ\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-16644651.mjs"
  },
  "/_nuxt/create-1865a3dc.mjs": {
    "type": "application/javascript",
    "etag": "\"19e-ggOYDpntd5HVcVyKQcdjTGboo6o\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-1865a3dc.mjs"
  },
  "/_nuxt/create-1979c930.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-efRsf8mnmAyjzIPeHmmm0kv46pw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-1979c930.mjs"
  },
  "/_nuxt/create-1f148dae.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-NvXhCKsZwFdYYmcPzaviXmcbgpk\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-1f148dae.mjs"
  },
  "/_nuxt/create-1faadcfb.mjs": {
    "type": "application/javascript",
    "etag": "\"1bf-hN/kv4IFCqlS/TIwD+AQFPUG8rw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-1faadcfb.mjs"
  },
  "/_nuxt/create-22de1782.mjs": {
    "type": "application/javascript",
    "etag": "\"1f8-KAK8C0PiFjUZIQz8bdC5rOAbkkQ\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-22de1782.mjs"
  },
  "/_nuxt/create-2426cd2d.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-J50fjrw3prcZglSfd7a+2dC3EGg\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/create-2426cd2d.mjs"
  },
  "/_nuxt/create-25deb65d.mjs": {
    "type": "application/javascript",
    "etag": "\"189-mQYjIU8voq+ledYdSMrH5pMZWtY\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/create-25deb65d.mjs"
  },
  "/_nuxt/create-3358cd7d.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-qRRL1yHPsw41Dayy5K9aiYTJCRU\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-3358cd7d.mjs"
  },
  "/_nuxt/create-3cb24594.mjs": {
    "type": "application/javascript",
    "etag": "\"1e0-CEdR4HhfrTGNTluAGnCWwyMiV/c\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-3cb24594.mjs"
  },
  "/_nuxt/create-46cfd07f.mjs": {
    "type": "application/javascript",
    "etag": "\"1e2-0iV/tFcPnIrLcLF0gsk3FVWIbEc\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-46cfd07f.mjs"
  },
  "/_nuxt/create-51ad8cf6.mjs": {
    "type": "application/javascript",
    "etag": "\"1dd-wC1cLWeXzQN01pPANRILpkMFddA\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-51ad8cf6.mjs"
  },
  "/_nuxt/create-594a4b5f.mjs": {
    "type": "application/javascript",
    "etag": "\"1db-KPjIWGZyBOVoL+CXW+CqDzahhIY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-594a4b5f.mjs"
  },
  "/_nuxt/create-65af493e.mjs": {
    "type": "application/javascript",
    "etag": "\"202-Dt4/GUBywaRLFyvPWEJ53xlO5wQ\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-65af493e.mjs"
  },
  "/_nuxt/create-6d988b12.mjs": {
    "type": "application/javascript",
    "etag": "\"19e-ggOYDpntd5HVcVyKQcdjTGboo6o\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-6d988b12.mjs"
  },
  "/_nuxt/create-71113ff1.mjs": {
    "type": "application/javascript",
    "etag": "\"2c4-99ICCNssEG9HXkfsVYSCxY04WhI\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-71113ff1.mjs"
  },
  "/_nuxt/create-725009ee.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-MI0MpTbB54iZsDNDOtNuviwaK34\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-725009ee.mjs"
  },
  "/_nuxt/create-78290050.mjs": {
    "type": "application/javascript",
    "etag": "\"1f2-zPxPgt6DCRfackH8Nm2lVqtZRoo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-78290050.mjs"
  },
  "/_nuxt/create-7b1c59d5.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-z7dtMvWVZVhhFNsYf02FDxqmNLw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-7b1c59d5.mjs"
  },
  "/_nuxt/create-802e60a4.mjs": {
    "type": "application/javascript",
    "etag": "\"1fc-iFKO2K7Wrqm+BgO95/p6mSH33Wo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-802e60a4.mjs"
  },
  "/_nuxt/create-8ccb72a2.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6-htZGZh9jorThrK1XKxFqxnbEeQY\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-8ccb72a2.mjs"
  },
  "/_nuxt/create-8e665688.mjs": {
    "type": "application/javascript",
    "etag": "\"c8d-JpQInjHuq8jlwcZZVJDEZzYIpTU\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-8e665688.mjs"
  },
  "/_nuxt/create-8ff52826.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-4PQg9eRZzPz+bUTaQDdx7HaddXo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-8ff52826.mjs"
  },
  "/_nuxt/create-9472aa04.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-V6AavYIZ1fRWhcx9mIMimZRF0Ls\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-9472aa04.mjs"
  },
  "/_nuxt/create-bd5b8914.mjs": {
    "type": "application/javascript",
    "etag": "\"1b7-NbGtwkzfmTlo98Cu1GN0yHG6x2U\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-bd5b8914.mjs"
  },
  "/_nuxt/create-d2205798.mjs": {
    "type": "application/javascript",
    "etag": "\"1be-ki44u9QJLQrKn3QJ06XeQ2JGPwg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-d2205798.mjs"
  },
  "/_nuxt/create-d3376112.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-5XX77u0noIT8vAUZzbUQxoyB5qw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-d3376112.mjs"
  },
  "/_nuxt/create-e17773df.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-mCYl1XD+M49eZOsrBiSwCW4JEeI\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-e17773df.mjs"
  },
  "/_nuxt/create-e2ebe316.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6-WOKu9a7r61VMoar78/fLpKU4X9g\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-e2ebe316.mjs"
  },
  "/_nuxt/create-e86b439d.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-Q8EiyHWCpF8ElAi6cL24644urA0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-e86b439d.mjs"
  },
  "/_nuxt/create-eb3c31e2.mjs": {
    "type": "application/javascript",
    "etag": "\"1ef-3h9PDNw4QldcmJ9Dq2CcTiJ7KgA\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-eb3c31e2.mjs"
  },
  "/_nuxt/create-f60dfa82.mjs": {
    "type": "application/javascript",
    "etag": "\"1fd-2etY0KCrLFkW3xjKp9+79639ZIw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-f60dfa82.mjs"
  },
  "/_nuxt/create-f6bdce55.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-RsX7+OZAiJT+uUbMea/G3o+BYkk\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-f6bdce55.mjs"
  },
  "/_nuxt/create-f8bddbf6.mjs": {
    "type": "application/javascript",
    "etag": "\"1de-lDkBRmlQVggMXuMAF7IQmn6lmS4\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/create-f8bddbf6.mjs"
  },
  "/_nuxt/create-fbd80419.mjs": {
    "type": "application/javascript",
    "etag": "\"1ba-6QBw8bDYX3NvKPDRA9rKJuxn6nw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/create-fbd80419.mjs"
  },
  "/_nuxt/dashboard-683872e3.mjs": {
    "type": "application/javascript",
    "etag": "\"1fc1-IdjaYCMv680fb6xQxCHE0/kUf/k\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/dashboard-683872e3.mjs"
  },
  "/_nuxt/data-adaf28d7.mjs": {
    "type": "application/javascript",
    "etag": "\"6d5-oMucvo7acObqa2pfBmMzBGpGmuE\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/data-adaf28d7.mjs"
  },
  "/_nuxt/default-d8a46eaf.mjs": {
    "type": "application/javascript",
    "etag": "\"1a7-JzA/L9RT30gejtglkpOayrih69Y\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/default-d8a46eaf.mjs"
  },
  "/_nuxt/edit-07f1188b.mjs": {
    "type": "application/javascript",
    "etag": "\"1fe-2z8ha028xa6kH9xZ7wWD0X+0YcQ\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-07f1188b.mjs"
  },
  "/_nuxt/edit-0d3917cc.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-PwIdgzFWeWMDh1c62iF6B3t9LgM\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-0d3917cc.mjs"
  },
  "/_nuxt/edit-10ba3c59.mjs": {
    "type": "application/javascript",
    "etag": "\"1e9-Z3px0YYpn4VypZyt9G1OonSq1eY\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-10ba3c59.mjs"
  },
  "/_nuxt/edit-174b1aee.mjs": {
    "type": "application/javascript",
    "etag": "\"1e3-pnzKFdVYYv1v/XB9DQYBiGIS2v4\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-174b1aee.mjs"
  },
  "/_nuxt/edit-219845b7.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-oEXoUtyqd9KFSUowHV+yVsPS1qg\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-219845b7.mjs"
  },
  "/_nuxt/edit-32303a8c.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-AvhcUS7dKVah+kmzsX3LcExwdUo\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-32303a8c.mjs"
  },
  "/_nuxt/edit-3372a143.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3-owi9LQV+n9VZEMyq0/WP10O9m7c\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-3372a143.mjs"
  },
  "/_nuxt/edit-422d5084.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-2YBl3wOw7yyt2H+Iy+plv4mzS3Y\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-422d5084.mjs"
  },
  "/_nuxt/edit-494343dc.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-her5iV7bcb0Q4tNDEGB+O2Ob2+I\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-494343dc.mjs"
  },
  "/_nuxt/edit-4b479c12.mjs": {
    "type": "application/javascript",
    "etag": "\"1c5-CLMZHN/w1tcgHJOXXgBh20tTMLg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-4b479c12.mjs"
  },
  "/_nuxt/edit-4cf32f1a.mjs": {
    "type": "application/javascript",
    "etag": "\"1f8-Cj98ACa5lz2Bs4PnWYDtK+bvvOA\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-4cf32f1a.mjs"
  },
  "/_nuxt/edit-51b0a7e1.mjs": {
    "type": "application/javascript",
    "etag": "\"1e7-AlxwDQ8DNyJqd3NBzuNIVExnxQQ\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-51b0a7e1.mjs"
  },
  "/_nuxt/edit-5b805383.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-kpAZ0OGCPy+efb1+vm924uXfUtI\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-5b805383.mjs"
  },
  "/_nuxt/edit-6a9acdcf.mjs": {
    "type": "application/javascript",
    "etag": "\"1f4-JZKDHJ2UZN9GU8diOd1ZWA4jYXA\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-6a9acdcf.mjs"
  },
  "/_nuxt/edit-6c7521f5.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-r/u6ljllMistfwUdYG+tz3KvD8s\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-6c7521f5.mjs"
  },
  "/_nuxt/edit-6c8e3ba8.mjs": {
    "type": "application/javascript",
    "etag": "\"1d9-zZzocuiggncFYls2bqhADDwaaaI\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-6c8e3ba8.mjs"
  },
  "/_nuxt/edit-6f852957.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-h8wBNTKumfC7A7JHxd+EcfMRTIs\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-6f852957.mjs"
  },
  "/_nuxt/edit-748cdab0.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-JGex6p2X9Uldw2cfWeIjfSmgQrU\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-748cdab0.mjs"
  },
  "/_nuxt/edit-799b6473.mjs": {
    "type": "application/javascript",
    "etag": "\"1e2-JCpvLkbhdS9ua9uFkQueZRiXG3Q\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-799b6473.mjs"
  },
  "/_nuxt/edit-7c987ab7.mjs": {
    "type": "application/javascript",
    "etag": "\"1d1-UZKta/RCSCJtCWaUa18eyTzJGT4\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-7c987ab7.mjs"
  },
  "/_nuxt/edit-8705583a.mjs": {
    "type": "application/javascript",
    "etag": "\"f84-bF3hsaMCCum+s8RZD7JNFYc7YUg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-8705583a.mjs"
  },
  "/_nuxt/edit-8c6bb651.mjs": {
    "type": "application/javascript",
    "etag": "\"1b8-icdiNqFOWn6ejCEvlff8eD5cpPo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-8c6bb651.mjs"
  },
  "/_nuxt/edit-91ae85c4.mjs": {
    "type": "application/javascript",
    "etag": "\"185-2+bEZr0VDnIS/W1YCk1/jxyiwwo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-91ae85c4.mjs"
  },
  "/_nuxt/edit-988d35af.mjs": {
    "type": "application/javascript",
    "etag": "\"1fe-Yf1J6zh3Kr4BSwHwtVIEqT/ka4Q\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-988d35af.mjs"
  },
  "/_nuxt/edit-9e9f855a.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-LBarc/6bC+Czj5OjTi/zZELQk8s\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-9e9f855a.mjs"
  },
  "/_nuxt/edit-a626e753.mjs": {
    "type": "application/javascript",
    "etag": "\"1e0-guuxZhEYPzwFfMosU1oDN00bpiI\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-a626e753.mjs"
  },
  "/_nuxt/edit-a889fbf8.mjs": {
    "type": "application/javascript",
    "etag": "\"1dc-Fc4mWC4ZPIeYRzmpvQkNgrM81T4\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-a889fbf8.mjs"
  },
  "/_nuxt/edit-ab3ee95e.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-Po4PR8JFF8LMo/eOeQtg6WCv74s\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-ab3ee95e.mjs"
  },
  "/_nuxt/edit-af08fff9.mjs": {
    "type": "application/javascript",
    "etag": "\"1a1-I0BvxRSN22VYT/gqncdBH3NLnbE\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-af08fff9.mjs"
  },
  "/_nuxt/edit-b184e88c.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-UnhYJn9kk1FGqyvcHZLUWckS/l4\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-b184e88c.mjs"
  },
  "/_nuxt/edit-b293eae0.mjs": {
    "type": "application/javascript",
    "etag": "\"31e-ChMqoMETb+Ab/aOUaj4aQPki7pc\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-b293eae0.mjs"
  },
  "/_nuxt/edit-b558608d.mjs": {
    "type": "application/javascript",
    "etag": "\"1a1-I0BvxRSN22VYT/gqncdBH3NLnbE\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-b558608d.mjs"
  },
  "/_nuxt/edit-baeef788.mjs": {
    "type": "application/javascript",
    "etag": "\"54f-y3yp79bg6dI2KXrUT35NBL8fYeI\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-baeef788.mjs"
  },
  "/_nuxt/edit-c057a205.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-9zWUW5AqHBspjLi7RkolTAPZp28\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-c057a205.mjs"
  },
  "/_nuxt/edit-c2e9da7e.mjs": {
    "type": "application/javascript",
    "etag": "\"1d9-H2v8lts+2YBZ70DhapokOqQvIRk\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-c2e9da7e.mjs"
  },
  "/_nuxt/edit-dcf44af7.mjs": {
    "type": "application/javascript",
    "etag": "\"810-D42p9FJBx1q44OsPuzcJb+11xyY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-dcf44af7.mjs"
  },
  "/_nuxt/edit-dd28d698.mjs": {
    "type": "application/javascript",
    "etag": "\"1ea-GSy+DS0Y7attljpjmhTffBSKtng\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/edit-dd28d698.mjs"
  },
  "/_nuxt/edit-f45df2a9.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-CU1qUQrJfARvsMPERMYnEVfh3Og\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edit-f45df2a9.mjs"
  },
  "/_nuxt/edit-f517509b.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-DNEq5TtFiQmqdANlmankCRIRtYI\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/edit-f517509b.mjs"
  },
  "/_nuxt/edittexts-cedb36dd.mjs": {
    "type": "application/javascript",
    "etag": "\"1362-pEnp94dMWzPacRAM8bdtDH7y/8U\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/edittexts-cedb36dd.mjs"
  },
  "/_nuxt/entry-f2f8a875.mjs": {
    "type": "application/javascript",
    "etag": "\"2fd753-MjVUo6KFBbF7h9EyiWK88vyOXxc\"",
    "mtime": "2022-03-02T16:39:55.321Z",
    "path": "../public/_nuxt/entry-f2f8a875.mjs"
  },
  "/_nuxt/entry.8a18453b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10cb90-Q51LE6EwRMkc+p0v8d1tcoK27cs\"",
    "mtime": "2022-03-02T16:39:55.319Z",
    "path": "../public/_nuxt/entry.8a18453b.css"
  },
  "/_nuxt/export-88775ea9.mjs": {
    "type": "application/javascript",
    "etag": "\"9dc-h4Efq1syVV4R/FAfZX7sC7Wjhrg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/export-88775ea9.mjs"
  },
  "/_nuxt/export-d6307d9a.mjs": {
    "type": "application/javascript",
    "etag": "\"b43-/eXNVLMjmM5KQM9rHAaJpOWhQ/E\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/export-d6307d9a.mjs"
  },
  "/_nuxt/families.3d9c3957.svg": {
    "type": "image/svg+xml",
    "etag": "\"428-qTd5Qr9RjATtIBz6abz8MUjXNFw\"",
    "mtime": "2022-03-02T16:39:55.290Z",
    "path": "../public/_nuxt/families.3d9c3957.svg"
  },
  "/_nuxt/files-b5fb756d.mjs": {
    "type": "application/javascript",
    "etag": "\"b7d-e0LirPuPveChla0RSJU8gINvu+8\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/files-b5fb756d.mjs"
  },
  "/_nuxt/footer-logo.5f2e1674.svg": {
    "type": "image/svg+xml",
    "etag": "\"1699-aDEWsiHD55w75e02xEejrzXwUJk\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/footer-logo.5f2e1674.svg"
  },
  "/_nuxt/gedcom.e2607d6f.svg": {
    "type": "image/svg+xml",
    "etag": "\"382-WwrxgmrqBsJrq3fyPTHJfIHVUnI\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/gedcom.e2607d6f.svg"
  },
  "/_nuxt/gimport.66edca1c.svg": {
    "type": "image/svg+xml",
    "etag": "\"43a-1CmSyWDKaw2nZpFeCwjSEkxok7I\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/gimport.66edca1c.svg"
  },
  "/_nuxt/github.e1450ac5.png": {
    "type": "image/png",
    "etag": "\"5fcd-IpzYtBKzzy4rAdbP5/V6SF2amXY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/github.e1450ac5.png"
  },
  "/_nuxt/google-8fb0109d.mjs": {
    "type": "application/javascript",
    "etag": "\"e1-EvOwkM6ru+DrBQhDWtriCFbgwfg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/google-8fb0109d.mjs"
  },
  "/_nuxt/google.4a9b58b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d33-OTIbQqzLe5uGZGqUeNS4KkJjc8U\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/google.4a9b58b2.jpg"
  },
  "/_nuxt/import-5ae2541a.mjs": {
    "type": "application/javascript",
    "etag": "\"8ea-eOUi+2QBapu+dPlWDBiEPDGG0qk\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/import-5ae2541a.mjs"
  },
  "/_nuxt/import.07b709e3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e4-YTs+4FDiAi2ONykkncefhfjBheg\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/import.07b709e3.svg"
  },
  "/_nuxt/index-0aa448eb.mjs": {
    "type": "application/javascript",
    "etag": "\"165-BUmN5dCHOkF+HTnMueMCkIthHWg\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-0aa448eb.mjs"
  },
  "/_nuxt/index-10a90a31.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-sjn3vRSCPnQkBcsIb2LAKmSNrLA\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-10a90a31.mjs"
  },
  "/_nuxt/index-14fc80f3.mjs": {
    "type": "application/javascript",
    "etag": "\"d9-K8Nx8rXEXMzfb9eZtGdgF4oiY/8\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-14fc80f3.mjs"
  },
  "/_nuxt/index-250d7121.mjs": {
    "type": "application/javascript",
    "etag": "\"187-IgG9f16seb+tGs8pFmfe9AUp+lo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-250d7121.mjs"
  },
  "/_nuxt/index-278331a1.mjs": {
    "type": "application/javascript",
    "etag": "\"159-z6hgsrmPFt4cxy9Q2i7sJ+tNXCY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-278331a1.mjs"
  },
  "/_nuxt/index-30fddb9d.mjs": {
    "type": "application/javascript",
    "etag": "\"154-ZQfNhxYt1yEu8ToVgs2fUouCgZQ\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-30fddb9d.mjs"
  },
  "/_nuxt/index-3aba428e.mjs": {
    "type": "application/javascript",
    "etag": "\"168-vUDzP4OuNlWhfGIXDeb656C0d5Y\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-3aba428e.mjs"
  },
  "/_nuxt/index-3b9ff609.mjs": {
    "type": "application/javascript",
    "etag": "\"138-1T96jP+DMx+75TxJ68LNJ+lKUc0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-3b9ff609.mjs"
  },
  "/_nuxt/index-3c364b5b.mjs": {
    "type": "application/javascript",
    "etag": "\"32e-3Vv8BQHVha+uBoxEZlLYekcGvX8\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-3c364b5b.mjs"
  },
  "/_nuxt/index-3c830813.mjs": {
    "type": "application/javascript",
    "etag": "\"12a6-njSbMdqdn88e+qSXktcES9EW6Yg\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-3c830813.mjs"
  },
  "/_nuxt/index-3f66e8b8.mjs": {
    "type": "application/javascript",
    "etag": "\"16e-zoZEIF1gwn1A+CzlwWjnbDnu02I\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-3f66e8b8.mjs"
  },
  "/_nuxt/index-44e8ed01.mjs": {
    "type": "application/javascript",
    "etag": "\"13a-WqklmZyMFhtNERdVzHxVL//z8EQ\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-44e8ed01.mjs"
  },
  "/_nuxt/index-46b02813.mjs": {
    "type": "application/javascript",
    "etag": "\"d8-aQHZ8gsmW+Zr/xtLu0+rlhF6cVI\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-46b02813.mjs"
  },
  "/_nuxt/index-46b2ac18.mjs": {
    "type": "application/javascript",
    "etag": "\"9c1-dijKTmXWBm3D6n3ztzwHOtlcE0g\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-46b2ac18.mjs"
  },
  "/_nuxt/index-4d940381.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-roVB7k6+tdJ1n1h7pDYNt/mq8Ek\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-4d940381.mjs"
  },
  "/_nuxt/index-4da001fe.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-DvMMCn70lEuQwJnVHnzso+xG15Y\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-4da001fe.mjs"
  },
  "/_nuxt/index-4fd1f2b4.mjs": {
    "type": "application/javascript",
    "etag": "\"17c-QcNR024+M5qcLo7MJ1SIzCJFte0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-4fd1f2b4.mjs"
  },
  "/_nuxt/index-5220795d.mjs": {
    "type": "application/javascript",
    "etag": "\"201-zca+XBD5H0cWM44Ac6ZDxUzI+Gw\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-5220795d.mjs"
  },
  "/_nuxt/index-5be44dbf.mjs": {
    "type": "application/javascript",
    "etag": "\"30a-hsQ9eKH6JvvBQqjQH2FQL7G7ock\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-5be44dbf.mjs"
  },
  "/_nuxt/index-5cc81baf.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-lhqpllMe6OWS2pgnHujnZdzKQSY\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-5cc81baf.mjs"
  },
  "/_nuxt/index-5e256f62.mjs": {
    "type": "application/javascript",
    "etag": "\"15e-FfNtlGYJnYatq6FHc6XsfBfm9Aw\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-5e256f62.mjs"
  },
  "/_nuxt/index-6370bdce.mjs": {
    "type": "application/javascript",
    "etag": "\"1651-qJCsRnykH1QSHrgOtm2IcDB3y2A\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-6370bdce.mjs"
  },
  "/_nuxt/index-6a4acc21.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-hvMn9jZQPzBlRGUFomlf1pizYWY\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/index-6a4acc21.mjs"
  },
  "/_nuxt/index-72a226a5.mjs": {
    "type": "application/javascript",
    "etag": "\"fa2-NdQEsaUf/5KVkTOi35xzjVkvnEc\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-72a226a5.mjs"
  },
  "/_nuxt/index-7908b53d.mjs": {
    "type": "application/javascript",
    "etag": "\"165-YoIf7weGY/PJncjTmCTxg7er4So\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-7908b53d.mjs"
  },
  "/_nuxt/index-840cef71.mjs": {
    "type": "application/javascript",
    "etag": "\"143-Uc18lYRIVWeX0UlHVoisDrOJhAM\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-840cef71.mjs"
  },
  "/_nuxt/index-892565af.mjs": {
    "type": "application/javascript",
    "etag": "\"eb1-mweX9/VoDbUd0Rk+QcjFYdy+UF0\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-892565af.mjs"
  },
  "/_nuxt/index-8a122920.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-QU1QJWGPReI7goXk9pEdgECBY6M\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-8a122920.mjs"
  },
  "/_nuxt/index-92b95656.mjs": {
    "type": "application/javascript",
    "etag": "\"186-FXR8tKZAgzDhKGmfPt9SSCJ98is\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-92b95656.mjs"
  },
  "/_nuxt/index-9a1ff39b.mjs": {
    "type": "application/javascript",
    "etag": "\"171-KXZkye3v2gn7XTvP+6FlVGezU2Y\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-9a1ff39b.mjs"
  },
  "/_nuxt/index-9f6ab51c.mjs": {
    "type": "application/javascript",
    "etag": "\"16a-7e642wAHdq2EipVRFSHkxoIOv84\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-9f6ab51c.mjs"
  },
  "/_nuxt/index-a3441443.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-hvMn9jZQPzBlRGUFomlf1pizYWY\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-a3441443.mjs"
  },
  "/_nuxt/index-a467af07.mjs": {
    "type": "application/javascript",
    "etag": "\"160-d8TNW6hNVPAGr0WPdg/FURp1mZc\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-a467af07.mjs"
  },
  "/_nuxt/index-af2d62b6.mjs": {
    "type": "application/javascript",
    "etag": "\"1cd-nb2GIAJyeuOAQnmER0GgpKRdNP0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-af2d62b6.mjs"
  },
  "/_nuxt/index-b01562c6.mjs": {
    "type": "application/javascript",
    "etag": "\"16f-8mA4FYbraQyz6muayApCj2Dbhi0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-b01562c6.mjs"
  },
  "/_nuxt/index-b28619fb.mjs": {
    "type": "application/javascript",
    "etag": "\"c1-3DzbbPunsgEA3gqOmMchmgJDCr0\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/index-b28619fb.mjs"
  },
  "/_nuxt/index-b57b12c9.mjs": {
    "type": "application/javascript",
    "etag": "\"163-9SeZT7QJHMGxr6w3QLeyyxK6UC8\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-b57b12c9.mjs"
  },
  "/_nuxt/index-c4b0cb9b.mjs": {
    "type": "application/javascript",
    "etag": "\"40f-J1lEwyrVeOdbSO0aBBNCyWE1iBE\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-c4b0cb9b.mjs"
  },
  "/_nuxt/index-d0b0aa95.mjs": {
    "type": "application/javascript",
    "etag": "\"188-Sn5zIsTZBiTcuvVPAtsLhVRJRxQ\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-d0b0aa95.mjs"
  },
  "/_nuxt/index-d3b339e4.mjs": {
    "type": "application/javascript",
    "etag": "\"1d4-vfNZrmcBcoKd/4qtJbGD9oF/YKo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-d3b339e4.mjs"
  },
  "/_nuxt/index-d6d08ccc.mjs": {
    "type": "application/javascript",
    "etag": "\"160-WgkzJVlg+rRh3fRUnvlFf75zkkc\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-d6d08ccc.mjs"
  },
  "/_nuxt/index-d7e5f686.mjs": {
    "type": "application/javascript",
    "etag": "\"101b-ycatoIQjjdANQ4y+g9B+B8tI7gc\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-d7e5f686.mjs"
  },
  "/_nuxt/index-d877d020.mjs": {
    "type": "application/javascript",
    "etag": "\"158-oPvO/UL+W6IWlBuxj7VVcqQCNZg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-d877d020.mjs"
  },
  "/_nuxt/index-d948fc8e.mjs": {
    "type": "application/javascript",
    "etag": "\"178-ko1PWFs7KC1yhq2wUTbJui3yu8o\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-d948fc8e.mjs"
  },
  "/_nuxt/index-d965f75d.mjs": {
    "type": "application/javascript",
    "etag": "\"224-hu2WX3oToqlSGNHXp1K3N6I27KI\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-d965f75d.mjs"
  },
  "/_nuxt/index-ddb87243.mjs": {
    "type": "application/javascript",
    "etag": "\"17c-MVpRGXwR0JNALX9u6OCbRZuz6Uc\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-ddb87243.mjs"
  },
  "/_nuxt/index-e460e17d.mjs": {
    "type": "application/javascript",
    "etag": "\"166-BmtrhgbBZI7R6EBRqyW7uMa1ock\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-e460e17d.mjs"
  },
  "/_nuxt/index-e8c2866d.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-RK+5+3x/YSNTYNbxmGWkPU+xN2s\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-e8c2866d.mjs"
  },
  "/_nuxt/index-e9265eb1.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-GQLhtVq5XlceE5GOx+axEoxDmgo\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-e9265eb1.mjs"
  },
  "/_nuxt/index-ea949e16.mjs": {
    "type": "application/javascript",
    "etag": "\"165-v+WD1zOhZfbYuYh6SHxujbV8r3Q\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-ea949e16.mjs"
  },
  "/_nuxt/index-ef7cb9f2.mjs": {
    "type": "application/javascript",
    "etag": "\"1c9-6iJ7hkSdXhdNjAeOpLiau5hhcc4\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/index-ef7cb9f2.mjs"
  },
  "/_nuxt/index-f3aba56c.mjs": {
    "type": "application/javascript",
    "etag": "\"167-XQbybGxPRJ9x1y+ZlPFeLivnTFs\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/index-f3aba56c.mjs"
  },
  "/_nuxt/index-ffe6d722.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-Ucj8jAvSMhqWTxCszR9CClihQxU\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/index-ffe6d722.mjs"
  },
  "/_nuxt/inspire-5d08d011.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-RJpnr9pztMoage0omiksWHTo5aU\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/inspire-5d08d011.mjs"
  },
  "/_nuxt/integrations-6a6b61d9.mjs": {
    "type": "application/javascript",
    "etag": "\"e7-MMPbFjgA0djs32m2y59gbXK/KYg\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/integrations-6a6b61d9.mjs"
  },
  "/_nuxt/localisation-8d26c82c.mjs": {
    "type": "application/javascript",
    "etag": "\"124-h0aBR81ly5Rpovd+RCdHMQKgI/0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/localisation-8d26c82c.mjs"
  },
  "/_nuxt/login-0460f8ce.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-LwBo7OnePG79xAphm6O+2T9nsYQ\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/login-0460f8ce.mjs"
  },
  "/_nuxt/logo.a5e075c8.svg": {
    "type": "image/svg+xml",
    "etag": "\"3782-tDaWYNRdx7R6zLXMZyolcPsaI1s\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/logo.a5e075c8.svg"
  },
  "/_nuxt/logo1.a5935c29.svg": {
    "type": "image/svg+xml",
    "etag": "\"1690-Ni9KJOE92q4KVikPL3Wr7+B3M2w\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/logo1.a5935c29.svg"
  },
  "/_nuxt/logs-72738fd6.mjs": {
    "type": "application/javascript",
    "etag": "\"11c-iJ8sT/zl0ZHIEKiHr6Vp4HDqhfg\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/logs-72738fd6.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"ccd7-ZCCpThccfjNSuUh/C7eQ/Ae8BTk\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/menu-f6fe7773.mjs": {
    "type": "application/javascript",
    "etag": "\"fb-jgIoXsmOuFIvrEZSUFmw2eX5eEA\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/menu-f6fe7773.mjs"
  },
  "/_nuxt/mockup01@2x.3841722f.webp": {
    "type": "image/webp",
    "etag": "\"d270-1YNsv1fAQnfkMzIZEIuEKzL1OBM\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/mockup01@2x.3841722f.webp"
  },
  "/_nuxt/mockup02@2x.69a30983.webp": {
    "type": "image/webp",
    "etag": "\"8d36-6P7Ghcfyfutj7Se0zxT1C850fNM\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/mockup02@2x.69a30983.webp"
  },
  "/_nuxt/mockup03@2x.cba11add.webp": {
    "type": "image/webp",
    "etag": "\"1088a-exlbgkBGNb+P6/vCM4TWkU64Mko\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/mockup03@2x.cba11add.webp"
  },
  "/_nuxt/ntree.c8e13021.svg": {
    "type": "image/svg+xml",
    "etag": "\"3eb-sWdrY32j098P+R/JZ0mTi4CAdZk\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/ntree.c8e13021.svg"
  },
  "/_nuxt/old-1a2228fe.mjs": {
    "type": "application/javascript",
    "etag": "\"138a-b4rzRcmkH7ETFtVuEyfHTC83a3w\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/old-1a2228fe.mjs"
  },
  "/_nuxt/people-2c1b933b.mjs": {
    "type": "application/javascript",
    "etag": "\"11b-aC/Q+W++dl+ON70l22NpIvFTO4I\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/people-2c1b933b.mjs"
  },
  "/_nuxt/peoples.2a1a40f4.svg": {
    "type": "image/svg+xml",
    "etag": "\"49d-MmjFBu68EahIk0VhX0UVVbdSlHo\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/peoples.2a1a40f4.svg"
  },
  "/_nuxt/permission-f6a4b5db.mjs": {
    "type": "application/javascript",
    "etag": "\"10a-S+2Pl+n91P2Urlnbl8/+AGF7P7Y\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/permission-f6a4b5db.mjs"
  },
  "/_nuxt/permissions-24ec7fbe.mjs": {
    "type": "application/javascript",
    "etag": "\"11d-nukEjyAP0eYzfZD91K+btS2B1gU\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/permissions-24ec7fbe.mjs"
  },
  "/_nuxt/plan_info_img.b2511fba.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ac78-iTHxITbCe52fCEwjoCHY+pEa28E\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/plan_info_img.b2511fba.svg"
  },
  "/_nuxt/privacy-d8393e72.mjs": {
    "type": "application/javascript",
    "etag": "\"61fa-27FwrUx2FL7AAtfZr3sfTppMwvk\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/privacy-d8393e72.mjs"
  },
  "/_nuxt/record.9f36145b.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fd-kqlxza0XfsIOW8pzJ2aH98Zsvn4\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/record.9f36145b.svg"
  },
  "/_nuxt/register-dd69514f.mjs": {
    "type": "application/javascript",
    "etag": "\"1ea-9p67REfA+X9h208U6P5HfzNyODI\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/register-dd69514f.mjs"
  },
  "/_nuxt/roles-b3bd894f.mjs": {
    "type": "application/javascript",
    "etag": "\"116-T+eyBemMxZmx6Sx53ySs42DeWtk\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/roles-b3bd894f.mjs"
  },
  "/_nuxt/sd.de0e25d4.svg": {
    "type": "image/svg+xml",
    "etag": "\"10047-0Ms35AifiiUoclTS34pJvWfVSZ0\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/sd.de0e25d4.svg"
  },
  "/_nuxt/secured.4e414d30.svg": {
    "type": "image/svg+xml",
    "etag": "\"385-A850ENq1M0gGtyH6tD+yNyQ4wvE\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/secured.4e414d30.svg"
  },
  "/_nuxt/settings-54c55092.mjs": {
    "type": "application/javascript",
    "etag": "\"24d-jsT4e4XZAMV8O8gsZddVKbeLi/Y\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/settings-54c55092.mjs"
  },
  "/_nuxt/show-03cb63fe.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-tG+xerEJLGAbP51b0DaGYIjFd4Q\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-03cb63fe.mjs"
  },
  "/_nuxt/show-143e0072.mjs": {
    "type": "application/javascript",
    "etag": "\"e1-zRd1Eh4TPOv29xXfwU/7XAOJW8o\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-143e0072.mjs"
  },
  "/_nuxt/show-314841f8.mjs": {
    "type": "application/javascript",
    "etag": "\"545-wcp82xjUZ8T2lHo2YYqtLqWn974\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/show-314841f8.mjs"
  },
  "/_nuxt/show-461911bd.mjs": {
    "type": "application/javascript",
    "etag": "\"f3-j7tZ6gDetBfpFol3EuQcMGS0OIU\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-461911bd.mjs"
  },
  "/_nuxt/show-474c031c.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-xu/zjdn5LojcLEFOsugQJE3nS+g\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-474c031c.mjs"
  },
  "/_nuxt/show-4a41bdcd.mjs": {
    "type": "application/javascript",
    "etag": "\"164-qEvi+zHb+Of2i6O9RSKkrRmf5k8\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-4a41bdcd.mjs"
  },
  "/_nuxt/show-4cb056e5.mjs": {
    "type": "application/javascript",
    "etag": "\"ee-KV5twJnwH1VYTNOOMQgAxajDGsM\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-4cb056e5.mjs"
  },
  "/_nuxt/show-50c77406.mjs": {
    "type": "application/javascript",
    "etag": "\"106-7GfPirSvpHRNecOt1KZgEjRh8Iw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-50c77406.mjs"
  },
  "/_nuxt/show-58e41075.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-5Ee1SB6604yQd6tjRmk071zZjJs\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-58e41075.mjs"
  },
  "/_nuxt/show-59a289f8.mjs": {
    "type": "application/javascript",
    "etag": "\"100-BbUCpKMNOanSqDvQyMD80qCke7o\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-59a289f8.mjs"
  },
  "/_nuxt/show-5a8dfabf.mjs": {
    "type": "application/javascript",
    "etag": "\"f7-pcHBCCbGwO075CUm1L49N4RIGjo\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-5a8dfabf.mjs"
  },
  "/_nuxt/show-5d0c9126.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-acAkiqKXmMnLFZoObM2fDVzwyCU\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-5d0c9126.mjs"
  },
  "/_nuxt/show-6175659b.mjs": {
    "type": "application/javascript",
    "etag": "\"ef-SJYP+4bFcvtSXd5P7l7TiDzMepc\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-6175659b.mjs"
  },
  "/_nuxt/show-681d70a7.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-zMQI/PSy5RY8+e0uSGH1qxMYxA8\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-681d70a7.mjs"
  },
  "/_nuxt/show-6e990e25.mjs": {
    "type": "application/javascript",
    "etag": "\"e6-HQYNTnr4Ci+tdfjTnMf78Kg4xE4\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-6e990e25.mjs"
  },
  "/_nuxt/show-759649fe.mjs": {
    "type": "application/javascript",
    "etag": "\"e4-hn7DB2xKDXVXm2mXhy0eJvBqsKA\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-759649fe.mjs"
  },
  "/_nuxt/show-79738391.mjs": {
    "type": "application/javascript",
    "etag": "\"f6-gKD3//1tX+u7onykVV30KZwwf78\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-79738391.mjs"
  },
  "/_nuxt/show-8448926e.mjs": {
    "type": "application/javascript",
    "etag": "\"f5-EdNuJ79tlrlchsApSApcYb1zwio\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-8448926e.mjs"
  },
  "/_nuxt/show-9082ec5f.mjs": {
    "type": "application/javascript",
    "etag": "\"ef-6TqoKRq2qYp4GDRZWRgi09zWm/0\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-9082ec5f.mjs"
  },
  "/_nuxt/show-995ed071.mjs": {
    "type": "application/javascript",
    "etag": "\"100-+ETIuwLdogrroLGocb2tPeBDSDM\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-995ed071.mjs"
  },
  "/_nuxt/show-99b84c18.mjs": {
    "type": "application/javascript",
    "etag": "\"14a-5tCaMCj+UiHE/FUZwYFwN8e0y04\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-99b84c18.mjs"
  },
  "/_nuxt/show-9db9f3d8.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-OlISnGzEw4VU1j4HbHKyCXDTg6E\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-9db9f3d8.mjs"
  },
  "/_nuxt/show-a669e49c.mjs": {
    "type": "application/javascript",
    "etag": "\"139-JrSgTjOuGTbWBjJhH4ECSP5y/Gw\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-a669e49c.mjs"
  },
  "/_nuxt/show-a76244c4.mjs": {
    "type": "application/javascript",
    "etag": "\"e5-DVYC5VeyIOPtXZ+aHH6MWrfd7lY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-a76244c4.mjs"
  },
  "/_nuxt/show-a7d455f6.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-ESNmX06RE82gg8HKyBQplVO1+jw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-a7d455f6.mjs"
  },
  "/_nuxt/show-a851fbea.mjs": {
    "type": "application/javascript",
    "etag": "\"a9-5PdxSOeeZn7TuCxXTIIvqW4LY8A\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-a851fbea.mjs"
  },
  "/_nuxt/show-a876a9b1.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-TJog6pBA5AOndxNNHvNIwYuemjw\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-a876a9b1.mjs"
  },
  "/_nuxt/show-af0c1dbf.mjs": {
    "type": "application/javascript",
    "etag": "\"f3-oq2oCeAwbThCnc6HaG7yJ42JLJU\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-af0c1dbf.mjs"
  },
  "/_nuxt/show-c21f0e9b.mjs": {
    "type": "application/javascript",
    "etag": "\"421-OxtwP93hXwJPAggnFtsozerpiCI\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-c21f0e9b.mjs"
  },
  "/_nuxt/show-d82448d5.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-8/zyiw02bmGVLiP3687TcVhKMMc\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/show-d82448d5.mjs"
  },
  "/_nuxt/show-dba9924c.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-IpSN8zb+ai58YH6cdgVfch0rsok\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-dba9924c.mjs"
  },
  "/_nuxt/show-e4cc53c4.mjs": {
    "type": "application/javascript",
    "etag": "\"106-LDl1yh0nzlWHFKDPIFNfxp3ZK80\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/show-e4cc53c4.mjs"
  },
  "/_nuxt/show-ea3caf2e.mjs": {
    "type": "application/javascript",
    "etag": "\"ed-1Md5agjMBzq40qJavDsxDL3/nVs\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/show-ea3caf2e.mjs"
  },
  "/_nuxt/social-callback-2f6c13cd.mjs": {
    "type": "application/javascript",
    "etag": "\"498-Y7BYnH/SYUlf9EYu1WB3agN1mFQ\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/social-callback-2f6c13cd.mjs"
  },
  "/_nuxt/system-7928b0da.mjs": {
    "type": "application/javascript",
    "etag": "\"f7-LBQhI/o/cXe5dAKZsjvtqeIMeXw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/system-7928b0da.mjs"
  },
  "/_nuxt/tasks-e6bc2b1d.mjs": {
    "type": "application/javascript",
    "etag": "\"f9-Ioknw4S8wrGC3qHBGwxYNiG/5o8\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/tasks-e6bc2b1d.mjs"
  },
  "/_nuxt/teams-02e150d9.mjs": {
    "type": "application/javascript",
    "etag": "\"956-aTnPxsoPHXJVvJH6BrYSvnH3WPE\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/teams-02e150d9.mjs"
  },
  "/_nuxt/termsandconditions-a19e1440.mjs": {
    "type": "application/javascript",
    "etag": "\"4465-PRUDJ5bXXntxIAug76Bz9bYWg5I\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/termsandconditions-a19e1440.mjs"
  },
  "/_nuxt/tutorials-e9b567f3.mjs": {
    "type": "application/javascript",
    "etag": "\"119-RHFxKq/wYO7xWjanA0eiZU3XIEw\"",
    "mtime": "2022-03-02T16:39:55.313Z",
    "path": "../public/_nuxt/tutorials-e9b567f3.mjs"
  },
  "/_nuxt/upload.685963e0.svg": {
    "type": "image/svg+xml",
    "etag": "\"4d2-YPzEMbCKqJ231jc26QS8qxnuIKQ\"",
    "mtime": "2022-03-02T16:39:55.311Z",
    "path": "../public/_nuxt/upload.685963e0.svg"
  },
  "/_nuxt/usergroups-269e043d.mjs": {
    "type": "application/javascript",
    "etag": "\"129-F2QWvPAJ7zeSZjed8T92EHIoB6E\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/usergroups-269e043d.mjs"
  },
  "/_nuxt/users-4ad5ea7c.mjs": {
    "type": "application/javascript",
    "etag": "\"11e-jh1W8WJuLkv4gmAwFpcQTp2dCqY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/users-4ad5ea7c.mjs"
  },
  "/_nuxt/verification-74d1e452.mjs": {
    "type": "application/javascript",
    "etag": "\"a0-h8RS8akVWKZXZFxaZXlQ9mDzZIM\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/verification-74d1e452.mjs"
  },
  "/_nuxt/verify-8b7c2fa4.mjs": {
    "type": "application/javascript",
    "etag": "\"324-yrtnbFv5jufIz+FiJ4NNMgzDr0Q\"",
    "mtime": "2022-03-02T16:39:55.314Z",
    "path": "../public/_nuxt/verify-8b7c2fa4.mjs"
  },
  "/_nuxt/videos-7ee33c03.mjs": {
    "type": "application/javascript",
    "etag": "\"1840-MJW+NSuje6zTmKMlzXgJe9EQkVs\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/videos-7ee33c03.mjs"
  },
  "/_nuxt/_person-58820a9a.mjs": {
    "type": "application/javascript",
    "etag": "\"2c8-46QY8bGVwOK2dGoYBtXEVUV2rlY\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/_person-58820a9a.mjs"
  },
  "/_nuxt/_token-3cb3e0ce.mjs": {
    "type": "application/javascript",
    "etag": "\"5c0-P7yE7Phgw3LzAiVURtf1e/UBR4w\"",
    "mtime": "2022-03-02T16:39:55.312Z",
    "path": "../public/_nuxt/_token-3cb3e0ce.mjs"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/D:/task/family365/nuxt3-app/dist" + "/" + "1646239164";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
