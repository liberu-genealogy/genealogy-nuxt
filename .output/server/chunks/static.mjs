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
  "/_nuxt/403-8cd3d9f0.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-/ZjI9fyRxNT+5ZCcmqygR5iZyPU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/403-8cd3d9f0.mjs"
  },
  "/_nuxt/404-18f72271.mjs": {
    "type": "application/javascript",
    "etag": "\"1f5-1njndTHn6Qhz1uJ4+za8ST3OJw8\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/404-18f72271.mjs"
  },
  "/_nuxt/503-3f354fdc.mjs": {
    "type": "application/javascript",
    "etag": "\"238-Y8LvfBOiL0ehuGDJMvNcHNjzUto\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/503-3f354fdc.mjs"
  },
  "/_nuxt/activitylog-f618081c.mjs": {
    "type": "application/javascript",
    "etag": "\"339-UMLC5XnoHEo2p11cGGM9hkUHvxo\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/activitylog-f618081c.mjs"
  },
  "/_nuxt/administration-954a5701.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-AraOk3x5AIjGNsE5rIeYt23aRrk\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/administration-954a5701.mjs"
  },
  "/_nuxt/auth-6c10edc1.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3-sejOxciVJ9+rVu85AppETcplR7E\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/auth-6c10edc1.mjs"
  },
  "/_nuxt/auth-a1531243.mjs": {
    "type": "application/javascript",
    "etag": "\"1ac-WbD7LSSjHsqZKIcyuZ8goHa7FUI\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/auth-a1531243.mjs"
  },
  "/_nuxt/calendar-c3bfba27.mjs": {
    "type": "application/javascript",
    "etag": "\"44c-pjcojtX+thrN1NeYn2fCMmc9pcc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/calendar-c3bfba27.mjs"
  },
  "/_nuxt/Checkmark.3a02cf8a.svg": {
    "type": "image/svg+xml",
    "etag": "\"483-IgmNcsPyMkH0iaSywhH9io0xMIs\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/Checkmark.3a02cf8a.svg"
  },
  "/_nuxt/colors.ab7bce47.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ea4-iEYJn2Y2dZxpuy8IJERCSZ2EOkE\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/colors.ab7bce47.css"
  },
  "/_nuxt/companies-6035cb05.mjs": {
    "type": "application/javascript",
    "etag": "\"121-aRk+FVhnLNzSvMnfMi1hz2YzMdQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/companies-6035cb05.mjs"
  },
  "/_nuxt/configure-1d228654.mjs": {
    "type": "application/javascript",
    "etag": "\"71d-P8MgvXfKsxSNEeh97du/U8kExUo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/configure-1d228654.mjs"
  },
  "/_nuxt/create-01b91f7b.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-CKj/zIN3WAJDINTo+uOQZWeL+KE\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-01b91f7b.mjs"
  },
  "/_nuxt/create-02e812c6.mjs": {
    "type": "application/javascript",
    "etag": "\"1e0-v67FHPv6+rOChpk18Ynyc8qmXRc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-02e812c6.mjs"
  },
  "/_nuxt/create-046c6384.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-DSkNbvhHd+Et7ODJyf18yT2/UTs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-046c6384.mjs"
  },
  "/_nuxt/create-0fe77f1f.mjs": {
    "type": "application/javascript",
    "etag": "\"1f8-xS5GFxij0x6du4ixoh2L4NJNu54\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-0fe77f1f.mjs"
  },
  "/_nuxt/create-145451b3.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-IBhweVzlywnkjPrFYlF276bJhF0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-145451b3.mjs"
  },
  "/_nuxt/create-17829669.mjs": {
    "type": "application/javascript",
    "etag": "\"1dd-rdAPnlyoHXjq2gyftg3nG/gpup0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-17829669.mjs"
  },
  "/_nuxt/create-1e339cdc.mjs": {
    "type": "application/javascript",
    "etag": "\"202-yqkCUYU/1TKk1YNYdP0J2JO7IxA\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-1e339cdc.mjs"
  },
  "/_nuxt/create-245d14e0.mjs": {
    "type": "application/javascript",
    "etag": "\"1db-pR7r57d08/WyT7fXRzElo8SGlXc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-245d14e0.mjs"
  },
  "/_nuxt/create-2a4598ed.mjs": {
    "type": "application/javascript",
    "etag": "\"1bf-KQdbwyEBbh7bFBeGWRibpz/UycY\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-2a4598ed.mjs"
  },
  "/_nuxt/create-2aa5c48f.mjs": {
    "type": "application/javascript",
    "etag": "\"1e2-Tiyu+VgHC0P4Eklg15GCV3PCj84\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-2aa5c48f.mjs"
  },
  "/_nuxt/create-32f2e1d4.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-B3p8mhKWxz1sxmCAvbLT8xqKU2o\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-32f2e1d4.mjs"
  },
  "/_nuxt/create-356c726c.mjs": {
    "type": "application/javascript",
    "etag": "\"1f0-GECqEr8G8YNNKdRucojZLBl5dBQ\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-356c726c.mjs"
  },
  "/_nuxt/create-439c5431.mjs": {
    "type": "application/javascript",
    "etag": "\"1be-eUa0QohsjHv4WSHDZYff6VG8Cs8\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-439c5431.mjs"
  },
  "/_nuxt/create-45bbe45e.mjs": {
    "type": "application/javascript",
    "etag": "\"19e-6WYd7qAz5ZN5OqGpQRvwDMAb2qA\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-45bbe45e.mjs"
  },
  "/_nuxt/create-4c311bf4.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-pJ6tgFUABm9hwfsg0TWH0+r6VKc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-4c311bf4.mjs"
  },
  "/_nuxt/create-4c85e4c0.mjs": {
    "type": "application/javascript",
    "etag": "\"2c4-y0dZo/iucFn7NE0wQz6t+WA/vsU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-4c85e4c0.mjs"
  },
  "/_nuxt/create-4eab4e4b.mjs": {
    "type": "application/javascript",
    "etag": "\"1bc-LY6Nxg0eQB9e7ee9YfQPn6LBKB0\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-4eab4e4b.mjs"
  },
  "/_nuxt/create-51661168.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-cAicFbFg/cHOEotnn6D9CLaHr0c\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-51661168.mjs"
  },
  "/_nuxt/create-5242eb54.mjs": {
    "type": "application/javascript",
    "etag": "\"c8d-9pHiZpu0wJxqZUTdzQnkR0+nDKM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-5242eb54.mjs"
  },
  "/_nuxt/create-6062784f.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-ZtdFKypIe23VLLD3lOf5jiT4RsA\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-6062784f.mjs"
  },
  "/_nuxt/create-722b3fe9.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-zvl0B0jt2WF8gRjFJbKD6xfI8to\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-722b3fe9.mjs"
  },
  "/_nuxt/create-77e13f56.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-QSpMnw0anrRJVjd92tfQOOKf1ec\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-77e13f56.mjs"
  },
  "/_nuxt/create-7fcc10fd.mjs": {
    "type": "application/javascript",
    "etag": "\"1de-Wyb0KjGyM+DZv7HhfKgn1l1PII0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-7fcc10fd.mjs"
  },
  "/_nuxt/create-902d99df.mjs": {
    "type": "application/javascript",
    "etag": "\"1f7-pB3vW0vY79Z3VghCFA3OpOgdWhk\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-902d99df.mjs"
  },
  "/_nuxt/create-9792e78a.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-Ju6V6dEqDveXrMHctyG7w4nkkfE\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-9792e78a.mjs"
  },
  "/_nuxt/create-9a412dd5.mjs": {
    "type": "application/javascript",
    "etag": "\"1b7-BklzNs5+8+xU0KFXwM0PatBzrM0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-9a412dd5.mjs"
  },
  "/_nuxt/create-9aa32357.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-2j0OEeyU7uDEgqjgybmSjyIjj9o\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-9aa32357.mjs"
  },
  "/_nuxt/create-ac34646d.mjs": {
    "type": "application/javascript",
    "etag": "\"189-cIADMFx1R6dQk1M1WpQlisU6uew\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-ac34646d.mjs"
  },
  "/_nuxt/create-b12843ca.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-xgqhDplfIWfXFEdUv7iJhDia28A\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-b12843ca.mjs"
  },
  "/_nuxt/create-b40f167b.mjs": {
    "type": "application/javascript",
    "etag": "\"1fd-tFm7LQXyD6QmkUJHdbG5t3OqHJc\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-b40f167b.mjs"
  },
  "/_nuxt/create-c2903631.mjs": {
    "type": "application/javascript",
    "etag": "\"1ba-C3LC8Qa5xZ05imQ/uFJfPs0dVh0\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-c2903631.mjs"
  },
  "/_nuxt/create-c7352fcc.mjs": {
    "type": "application/javascript",
    "etag": "\"19e-6WYd7qAz5ZN5OqGpQRvwDMAb2qA\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-c7352fcc.mjs"
  },
  "/_nuxt/create-c9b1574c.mjs": {
    "type": "application/javascript",
    "etag": "\"1f2-2gA1lJS9BniNEHdNEWixO+K2Ue4\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-c9b1574c.mjs"
  },
  "/_nuxt/create-d0167b53.mjs": {
    "type": "application/javascript",
    "etag": "\"1fc-2y6GKkpPwNfgzrWhnWU85OKpHug\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-d0167b53.mjs"
  },
  "/_nuxt/create-d2ac5860.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6-OBlbsvW9Ccj7H6+GJNn6ZTmzN4U\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-d2ac5860.mjs"
  },
  "/_nuxt/create-da1d5ddb.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-uSL5qQtUyy4VJv1oQgOOkDAyeec\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-da1d5ddb.mjs"
  },
  "/_nuxt/create-db47e380.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-gfqYNrd6RUwuhuYPWdVC60aDdHg\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-db47e380.mjs"
  },
  "/_nuxt/create-e50d0efd.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6-0UHDLYmkBtp/Lt1WFYfSXRzw0no\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/create-e50d0efd.mjs"
  },
  "/_nuxt/create-f4037c24.mjs": {
    "type": "application/javascript",
    "etag": "\"1ef-Wc8aDovfllMib9L03mZIdSbFWcU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/create-f4037c24.mjs"
  },
  "/_nuxt/dashboard-ae270a14.mjs": {
    "type": "application/javascript",
    "etag": "\"1fc1-o3lET/jvRQyGQvNswbWJ5JFqvaQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/dashboard-ae270a14.mjs"
  },
  "/_nuxt/data-adaf28d7.mjs": {
    "type": "application/javascript",
    "etag": "\"6d5-oMucvo7acObqa2pfBmMzBGpGmuE\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/data-adaf28d7.mjs"
  },
  "/_nuxt/default-5b0c6072.mjs": {
    "type": "application/javascript",
    "etag": "\"1a7-0Ng1XfxkvCnYqw7X/pgNX27xMvQ\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/default-5b0c6072.mjs"
  },
  "/_nuxt/edit-01a7a557.mjs": {
    "type": "application/javascript",
    "etag": "\"1e3-ZtUf8bVfmB2gWr5S9iMx59rB/6E\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-01a7a557.mjs"
  },
  "/_nuxt/edit-139dfe11.mjs": {
    "type": "application/javascript",
    "etag": "\"1f8-Vvxw3lzr1iCl5ZuxCE2cnOrDMcA\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-139dfe11.mjs"
  },
  "/_nuxt/edit-14e7871a.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-uigoBoEtB0e3gt0YZMuggToU2zo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-14e7871a.mjs"
  },
  "/_nuxt/edit-1753bfdd.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-nWulfxvPdPBAoDCoj8vbq0kyC+s\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-1753bfdd.mjs"
  },
  "/_nuxt/edit-1b66e0a6.mjs": {
    "type": "application/javascript",
    "etag": "\"54f-53PCFIeLsBmjj5Hqs7CBOLIudOI\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-1b66e0a6.mjs"
  },
  "/_nuxt/edit-1db80d98.mjs": {
    "type": "application/javascript",
    "etag": "\"1e0-jLJmoge6Pmq5itelbLdnEYnCmYM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-1db80d98.mjs"
  },
  "/_nuxt/edit-309debf4.mjs": {
    "type": "application/javascript",
    "etag": "\"1a1-mHKhb/SrexPlCUXkjU+wtGabbEs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-309debf4.mjs"
  },
  "/_nuxt/edit-3a655187.mjs": {
    "type": "application/javascript",
    "etag": "\"1e2-lHlQ7Aw2zQX6OAslaNp0GyMZIVs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-3a655187.mjs"
  },
  "/_nuxt/edit-3c543f9e.mjs": {
    "type": "application/javascript",
    "etag": "\"1b8-Pl0OHpgdpPrnSDcnJoe5SdJ5RVo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-3c543f9e.mjs"
  },
  "/_nuxt/edit-3f38938e.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-g9nSaDFOYEZ2/+g8StN3BzFp5PA\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-3f38938e.mjs"
  },
  "/_nuxt/edit-52cfe890.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-RzInJ+taLy7Fsg+e8QsGIoJMWT0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-52cfe890.mjs"
  },
  "/_nuxt/edit-5f0287a8.mjs": {
    "type": "application/javascript",
    "etag": "\"1dc-/DVCpmrDR/Na9ybdcCABwqg5anM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-5f0287a8.mjs"
  },
  "/_nuxt/edit-64effa62.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-nC6HxXoSLFOxnk5VLcvsdCJ7J24\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-64effa62.mjs"
  },
  "/_nuxt/edit-66d408f7.mjs": {
    "type": "application/javascript",
    "etag": "\"185-mRAB8xJABNkHyqF8rFuwZH72hhI\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-66d408f7.mjs"
  },
  "/_nuxt/edit-69b02634.mjs": {
    "type": "application/javascript",
    "etag": "\"1e9-3S6Xy4oCIFmnwGYm47hx8K8eF8M\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-69b02634.mjs"
  },
  "/_nuxt/edit-7cb0abd1.mjs": {
    "type": "application/javascript",
    "etag": "\"1a1-mHKhb/SrexPlCUXkjU+wtGabbEs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-7cb0abd1.mjs"
  },
  "/_nuxt/edit-8544af79.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-G6ooTyuZSsUHKuHRcXESKSllVVs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-8544af79.mjs"
  },
  "/_nuxt/edit-8621b148.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-FRqa+hAfQC+WVLISxT7bAFNndHk\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-8621b148.mjs"
  },
  "/_nuxt/edit-8907b56c.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-hH9srVx2tX+L9yUY9rMzCzvyKXo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-8907b56c.mjs"
  },
  "/_nuxt/edit-8c7ad231.mjs": {
    "type": "application/javascript",
    "etag": "\"1f4-OW/Eu/RpY8zdqpgPmzJrPJwAqlU\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-8c7ad231.mjs"
  },
  "/_nuxt/edit-8e46133f.mjs": {
    "type": "application/javascript",
    "etag": "\"810-hRbMH5+o/MjUcnu1rwyqcgujGqQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-8e46133f.mjs"
  },
  "/_nuxt/edit-94395eb1.mjs": {
    "type": "application/javascript",
    "etag": "\"1c5-mwtOJHVc2Zseeqzfgd/WHNYHXNs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-94395eb1.mjs"
  },
  "/_nuxt/edit-9640099a.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3-1RoebnBCQYTU3chJsMJaCny8N/g\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-9640099a.mjs"
  },
  "/_nuxt/edit-97bace5c.mjs": {
    "type": "application/javascript",
    "etag": "\"1fe-HpfZYUYAJXqyJZiLYUU9J86wlwc\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-97bace5c.mjs"
  },
  "/_nuxt/edit-9c65ff8a.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-E+BIhE1bhxPFOd9f/dryk79KfYU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-9c65ff8a.mjs"
  },
  "/_nuxt/edit-9e350a13.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-f8LdvF42b4+ILg7mrZK6q76Hah8\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-9e350a13.mjs"
  },
  "/_nuxt/edit-a0a12dc2.mjs": {
    "type": "application/javascript",
    "etag": "\"f84-zWHG06ek67Jc5ByupnxIPEsxFGg\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-a0a12dc2.mjs"
  },
  "/_nuxt/edit-a9e3d790.mjs": {
    "type": "application/javascript",
    "etag": "\"31e-qYbu3JVai5SpiDpQ0IWqeix0YyI\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-a9e3d790.mjs"
  },
  "/_nuxt/edit-af1f8406.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-jBTJeuiir+nCj/vWgk1jlfVLQY8\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-af1f8406.mjs"
  },
  "/_nuxt/edit-b36a500c.mjs": {
    "type": "application/javascript",
    "etag": "\"1d1-Swx/B6wAYHzsJ+Hbh+nqgl+QT8g\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-b36a500c.mjs"
  },
  "/_nuxt/edit-b7af6ae4.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-jBDliW1g0FVXG2DEkDuwHpmssa0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-b7af6ae4.mjs"
  },
  "/_nuxt/edit-c6b92b2e.mjs": {
    "type": "application/javascript",
    "etag": "\"1ea-O4LsoayKcYHCm/R3iaEo2gTxyzQ\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-c6b92b2e.mjs"
  },
  "/_nuxt/edit-cc5ee45d.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-nq9UmGFToMJUMv22RNQOm3KMq1k\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-cc5ee45d.mjs"
  },
  "/_nuxt/edit-cd207ecd.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-XOZa0V9G4nYEt/pUTYLZjYAPp0M\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-cd207ecd.mjs"
  },
  "/_nuxt/edit-d4bd1e16.mjs": {
    "type": "application/javascript",
    "etag": "\"1e7-/lX3oIgRaGhjKM2DoIbyhhPLfIM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-d4bd1e16.mjs"
  },
  "/_nuxt/edit-d4c9eb1c.mjs": {
    "type": "application/javascript",
    "etag": "\"1fe-u9TmImSUNH/TBTd3XYWNKjpNtp0\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edit-d4c9eb1c.mjs"
  },
  "/_nuxt/edit-df5d6426.mjs": {
    "type": "application/javascript",
    "etag": "\"1d9-UiZlAilM4jeNb10nvyGqE0DUQY4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-df5d6426.mjs"
  },
  "/_nuxt/edit-ea28311b.mjs": {
    "type": "application/javascript",
    "etag": "\"1d9-L9a6KOyVKUpJMIwPzS3tZU5pHFE\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-ea28311b.mjs"
  },
  "/_nuxt/edit-ecbf1012.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-s7boY4TU0odPdA+79C2yns0M3/M\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/edit-ecbf1012.mjs"
  },
  "/_nuxt/edittexts-cb4e5c9c.mjs": {
    "type": "application/javascript",
    "etag": "\"1362-13zUqyUmzKRPB9tEte1ijgyniro\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/edittexts-cb4e5c9c.mjs"
  },
  "/_nuxt/entry-ce02bd3c.mjs": {
    "type": "application/javascript",
    "etag": "\"2fd357-RM6+vUdLmj1W2BqY0205Pl2FAkk\"",
    "mtime": "2022-03-02T17:35:15.268Z",
    "path": "../public/_nuxt/entry-ce02bd3c.mjs"
  },
  "/_nuxt/entry.8a18453b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10cb90-Q51LE6EwRMkc+p0v8d1tcoK27cs\"",
    "mtime": "2022-03-02T17:35:15.266Z",
    "path": "../public/_nuxt/entry.8a18453b.css"
  },
  "/_nuxt/export-209a7976.mjs": {
    "type": "application/javascript",
    "etag": "\"9dc-cyv2sxRXC6zjir5gbsdbJZ8gGfc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/export-209a7976.mjs"
  },
  "/_nuxt/export-369945b1.mjs": {
    "type": "application/javascript",
    "etag": "\"b43-TSyujRLWnFCFQQPP7eAx7da7ts4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/export-369945b1.mjs"
  },
  "/_nuxt/families.3d9c3957.svg": {
    "type": "image/svg+xml",
    "etag": "\"428-qTd5Qr9RjATtIBz6abz8MUjXNFw\"",
    "mtime": "2022-03-02T17:35:15.249Z",
    "path": "../public/_nuxt/families.3d9c3957.svg"
  },
  "/_nuxt/files-abc8ba10.mjs": {
    "type": "application/javascript",
    "etag": "\"b7d-OMFO40O9RcWvtrog7QDkpiSJzFI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/files-abc8ba10.mjs"
  },
  "/_nuxt/footer-logo.5f2e1674.svg": {
    "type": "image/svg+xml",
    "etag": "\"1699-aDEWsiHD55w75e02xEejrzXwUJk\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/footer-logo.5f2e1674.svg"
  },
  "/_nuxt/gedcom.e2607d6f.svg": {
    "type": "image/svg+xml",
    "etag": "\"382-WwrxgmrqBsJrq3fyPTHJfIHVUnI\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/gedcom.e2607d6f.svg"
  },
  "/_nuxt/gimport.66edca1c.svg": {
    "type": "image/svg+xml",
    "etag": "\"43a-1CmSyWDKaw2nZpFeCwjSEkxok7I\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/gimport.66edca1c.svg"
  },
  "/_nuxt/github.e1450ac5.png": {
    "type": "image/png",
    "etag": "\"5fcd-IpzYtBKzzy4rAdbP5/V6SF2amXY\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/github.e1450ac5.png"
  },
  "/_nuxt/google-be25bfdc.mjs": {
    "type": "application/javascript",
    "etag": "\"e1-r7pcxUNo3V4zWfShWwRlfgX3NFU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/google-be25bfdc.mjs"
  },
  "/_nuxt/google.4a9b58b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d33-OTIbQqzLe5uGZGqUeNS4KkJjc8U\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/google.4a9b58b2.jpg"
  },
  "/_nuxt/import-6ab7dfb8.mjs": {
    "type": "application/javascript",
    "etag": "\"8ea-jMjDzAMCHL16a1Or8E5NkdwYWfI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/import-6ab7dfb8.mjs"
  },
  "/_nuxt/import.07b709e3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e4-YTs+4FDiAi2ONykkncefhfjBheg\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/import.07b709e3.svg"
  },
  "/_nuxt/index-210841ce.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-thGAbsZj/kx7bcqAIqkXWM5gt+s\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-210841ce.mjs"
  },
  "/_nuxt/index-22ba4d1d.mjs": {
    "type": "application/javascript",
    "etag": "\"167-jSOnBkAF6Pn6G7nOBsWIQcYG2PU\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-22ba4d1d.mjs"
  },
  "/_nuxt/index-24fed978.mjs": {
    "type": "application/javascript",
    "etag": "\"165-Bp+s3jz2thx+c9I8fKk098Ie4Yo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-24fed978.mjs"
  },
  "/_nuxt/index-27fdbbd2.mjs": {
    "type": "application/javascript",
    "etag": "\"eb1-wOtNB0StCRseN2iK5Sb7veYbxLI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-27fdbbd2.mjs"
  },
  "/_nuxt/index-306294db.mjs": {
    "type": "application/javascript",
    "etag": "\"d8-VFfnwUIMIkW0RHXtCnPx/K3qdoI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-306294db.mjs"
  },
  "/_nuxt/index-3203c27c.mjs": {
    "type": "application/javascript",
    "etag": "\"12a6-/yiUq1m99ClkHe65PqIyFY4ajj8\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-3203c27c.mjs"
  },
  "/_nuxt/index-32cece45.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-T4WS5V080TNKh1IEqQfxi1Hsp30\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-32cece45.mjs"
  },
  "/_nuxt/index-3479aa99.mjs": {
    "type": "application/javascript",
    "etag": "\"30a-zUvQarFshOlG5/y453kO2fWyhbQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-3479aa99.mjs"
  },
  "/_nuxt/index-375c4a59.mjs": {
    "type": "application/javascript",
    "etag": "\"1d4-vsoeEm02wnCWA39P9Qf30R/lybs\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-375c4a59.mjs"
  },
  "/_nuxt/index-38b9cdbe.mjs": {
    "type": "application/javascript",
    "etag": "\"187-ztG0Txcp/qcnJLRawGRppZCpHB4\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-38b9cdbe.mjs"
  },
  "/_nuxt/index-39b3e0a4.mjs": {
    "type": "application/javascript",
    "etag": "\"159-7FkbwDZrbxfPv+zAZpLzGIhi+Ek\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-39b3e0a4.mjs"
  },
  "/_nuxt/index-39e0bb98.mjs": {
    "type": "application/javascript",
    "etag": "\"178-pz2XJhdaaqKbCVoFCLwLtvSf7mY\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-39e0bb98.mjs"
  },
  "/_nuxt/index-3dd1f58a.mjs": {
    "type": "application/javascript",
    "etag": "\"163-W9n5ZQHLcMuvKGPFC9IDExrO0D8\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-3dd1f58a.mjs"
  },
  "/_nuxt/index-465ab459.mjs": {
    "type": "application/javascript",
    "etag": "\"32e-Si6RM/254+N8A5XsYCfikP2Fm4Y\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-465ab459.mjs"
  },
  "/_nuxt/index-4823199f.mjs": {
    "type": "application/javascript",
    "etag": "\"154-yuF4W+lCHR7qySfVreWq9QQr2qU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-4823199f.mjs"
  },
  "/_nuxt/index-53670086.mjs": {
    "type": "application/javascript",
    "etag": "\"16e-mUNVfniEwVLoJHHXvlBkXfLhxPM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-53670086.mjs"
  },
  "/_nuxt/index-55c2f19b.mjs": {
    "type": "application/javascript",
    "etag": "\"17c-PoAAUulxuOMVUDl4j1QJeKW4tMw\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-55c2f19b.mjs"
  },
  "/_nuxt/index-56d4d6a9.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-TjZ96rWZsChWTzmFxtkbV5lSYco\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-56d4d6a9.mjs"
  },
  "/_nuxt/index-62848ace.mjs": {
    "type": "application/javascript",
    "etag": "\"40f-PXn4aohap0722yIc5t0AkRPKlN8\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-62848ace.mjs"
  },
  "/_nuxt/index-66cc6c38.mjs": {
    "type": "application/javascript",
    "etag": "\"168-BSyHSwjPw/O9djXs48MHw4KH0ZE\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-66cc6c38.mjs"
  },
  "/_nuxt/index-72e8bbff.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-rmg/DqsNktFGov+M+2V4CeejNZI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-72e8bbff.mjs"
  },
  "/_nuxt/index-731f02e0.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-vGSGueU1b3JWELgF2QKkMKi+AcE\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-731f02e0.mjs"
  },
  "/_nuxt/index-78b02dec.mjs": {
    "type": "application/javascript",
    "etag": "\"165-vmMx0i+FF87LN4PGvZlLDGmHPoA\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-78b02dec.mjs"
  },
  "/_nuxt/index-79ab8d69.mjs": {
    "type": "application/javascript",
    "etag": "\"17c-cxItWVl7KJTzKlOrUWpzZzwRp+8\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-79ab8d69.mjs"
  },
  "/_nuxt/index-7c6406c3.mjs": {
    "type": "application/javascript",
    "etag": "\"16a-H2LG+uh8a7xEjDetqeODgQCMQIM\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-7c6406c3.mjs"
  },
  "/_nuxt/index-8310fe18.mjs": {
    "type": "application/javascript",
    "etag": "\"201-qHovrzaEo/XXbXHhZ5hQc0nAUnI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-8310fe18.mjs"
  },
  "/_nuxt/index-83535db8.mjs": {
    "type": "application/javascript",
    "etag": "\"9c1-/cy0Pwzo0wlK4p8RoVJC6HAxWVQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-83535db8.mjs"
  },
  "/_nuxt/index-85e70d59.mjs": {
    "type": "application/javascript",
    "etag": "\"166-0mYgXNV9Uc4wl2+gPmRxj5+xvBw\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-85e70d59.mjs"
  },
  "/_nuxt/index-87e2e020.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-7e5C5ZbpZAHxtVnxopSVE6YU2e0\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-87e2e020.mjs"
  },
  "/_nuxt/index-8c62df4c.mjs": {
    "type": "application/javascript",
    "etag": "\"160-jTh9IY33aO0eSGhzpMS+7V/oRXc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-8c62df4c.mjs"
  },
  "/_nuxt/index-93004950.mjs": {
    "type": "application/javascript",
    "etag": "\"15e-OU3dyKiEczCuZ+XFf61Ynozqjaw\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-93004950.mjs"
  },
  "/_nuxt/index-97cb720f.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-eAMZ4Xg1uEPnA+2ZljW/j9+6gSQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-97cb720f.mjs"
  },
  "/_nuxt/index-9d863015.mjs": {
    "type": "application/javascript",
    "etag": "\"16f-/cSoYbnlRNfFC/w9AVknbOcF6EU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-9d863015.mjs"
  },
  "/_nuxt/index-ae5fbcd7.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-5xT841W4SnpKB4HWOXquilJV3Nk\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-ae5fbcd7.mjs"
  },
  "/_nuxt/index-b59f3526.mjs": {
    "type": "application/javascript",
    "etag": "\"188-Qp/6MISRkhpr5aqQuPyJVgwm0jg\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-b59f3526.mjs"
  },
  "/_nuxt/index-b79185c6.mjs": {
    "type": "application/javascript",
    "etag": "\"158-dclsgenwHo5gmpptTYFiSoc8rrs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-b79185c6.mjs"
  },
  "/_nuxt/index-bb954fd6.mjs": {
    "type": "application/javascript",
    "etag": "\"160-/VUNgup77+ZyrNAz/mO4l4+ArTM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-bb954fd6.mjs"
  },
  "/_nuxt/index-bbb4ae7d.mjs": {
    "type": "application/javascript",
    "etag": "\"1651-gpyF/mIkzZPADJSXX4x9OSGQgug\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-bbb4ae7d.mjs"
  },
  "/_nuxt/index-bc68ade3.mjs": {
    "type": "application/javascript",
    "etag": "\"c1-d2X7/NevlyMxREHNr54zBzc9Pbc\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-bc68ade3.mjs"
  },
  "/_nuxt/index-bf524464.mjs": {
    "type": "application/javascript",
    "etag": "\"fa2-c10yqVD9bTWq3jFJIRBzt7frWVk\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-bf524464.mjs"
  },
  "/_nuxt/index-c43c8af0.mjs": {
    "type": "application/javascript",
    "etag": "\"165-NT2MG59HX4rQJ93bxihXDtC8LO8\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-c43c8af0.mjs"
  },
  "/_nuxt/index-c5c33518.mjs": {
    "type": "application/javascript",
    "etag": "\"171-3kZLJq9cRkhT6wOtm0X8CQE/BC4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-c5c33518.mjs"
  },
  "/_nuxt/index-d43a0aee.mjs": {
    "type": "application/javascript",
    "etag": "\"101b-JycrJYqZwfHNGGehE2IJVsqEb2w\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-d43a0aee.mjs"
  },
  "/_nuxt/index-d7ecfff0.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-wIHM6hbb4UzcsAlM14pzn6ELxk4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-d7ecfff0.mjs"
  },
  "/_nuxt/index-dae2e6e9.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-5xT841W4SnpKB4HWOXquilJV3Nk\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-dae2e6e9.mjs"
  },
  "/_nuxt/index-dd88773a.mjs": {
    "type": "application/javascript",
    "etag": "\"1cd-Kstmgt1CovZr4X5dony1acagpKA\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-dd88773a.mjs"
  },
  "/_nuxt/index-de90724b.mjs": {
    "type": "application/javascript",
    "etag": "\"13a-nPmQ844Z4RNEkIIDVfM9PR4Ip5A\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-de90724b.mjs"
  },
  "/_nuxt/index-eac38e6e.mjs": {
    "type": "application/javascript",
    "etag": "\"1c9-32T+3sYtJALrjqi2fdIsKc8yUMk\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-eac38e6e.mjs"
  },
  "/_nuxt/index-ead0453d.mjs": {
    "type": "application/javascript",
    "etag": "\"186-wD6rZWTsDek1bsqeatlmqKf0pXc\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-ead0453d.mjs"
  },
  "/_nuxt/index-ebfeffba.mjs": {
    "type": "application/javascript",
    "etag": "\"d9-gzXSrZczU2q+uw8BQvHhCemWhdM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-ebfeffba.mjs"
  },
  "/_nuxt/index-ed29cfd6.mjs": {
    "type": "application/javascript",
    "etag": "\"143-3vv2MUEpuCMDtOim51jkkj5/UZw\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/index-ed29cfd6.mjs"
  },
  "/_nuxt/index-f31e0290.mjs": {
    "type": "application/javascript",
    "etag": "\"224-018vie1n2dKDKOgkGI4+UcnO9AY\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-f31e0290.mjs"
  },
  "/_nuxt/index-f4ee2a6c.mjs": {
    "type": "application/javascript",
    "etag": "\"138-fhtef4jIDznlcL5T1fa1II/3M7k\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/index-f4ee2a6c.mjs"
  },
  "/_nuxt/inspire-619eeb4a.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-ZM7hlFTpDQcs+AgFsCXKSXfZJhM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/inspire-619eeb4a.mjs"
  },
  "/_nuxt/integrations-318023a5.mjs": {
    "type": "application/javascript",
    "etag": "\"e7-vBR5cLWnVr9BTwOrCSnryEvf5Wk\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/integrations-318023a5.mjs"
  },
  "/_nuxt/localisation-0290abaa.mjs": {
    "type": "application/javascript",
    "etag": "\"124-ZRiONNmcaCjEP7Nze11hceNC97Y\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/localisation-0290abaa.mjs"
  },
  "/_nuxt/login-18c2d83b.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-DS8PER3oT46xK5EBSUL+x61+WxM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/login-18c2d83b.mjs"
  },
  "/_nuxt/logo.a5e075c8.svg": {
    "type": "image/svg+xml",
    "etag": "\"3782-tDaWYNRdx7R6zLXMZyolcPsaI1s\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/logo.a5e075c8.svg"
  },
  "/_nuxt/logo1.a5935c29.svg": {
    "type": "image/svg+xml",
    "etag": "\"1690-Ni9KJOE92q4KVikPL3Wr7+B3M2w\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/logo1.a5935c29.svg"
  },
  "/_nuxt/logs-d05279d4.mjs": {
    "type": "application/javascript",
    "etag": "\"11c-RVXz3ruGbclJEjH9TgY5W4HmdUU\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/logs-d05279d4.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"ccd7-WqZ5d8rCatvv1pVs/XyRKSsMM40\"",
    "mtime": "2022-03-02T17:35:15.242Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/menu-e116dcfb.mjs": {
    "type": "application/javascript",
    "etag": "\"fb-1hUqT7N69tHGnHvA9KpSTjno25M\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/menu-e116dcfb.mjs"
  },
  "/_nuxt/mockup01@2x.3841722f.webp": {
    "type": "image/webp",
    "etag": "\"d270-1YNsv1fAQnfkMzIZEIuEKzL1OBM\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/mockup01@2x.3841722f.webp"
  },
  "/_nuxt/mockup02@2x.69a30983.webp": {
    "type": "image/webp",
    "etag": "\"8d36-6P7Ghcfyfutj7Se0zxT1C850fNM\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/mockup02@2x.69a30983.webp"
  },
  "/_nuxt/mockup03@2x.cba11add.webp": {
    "type": "image/webp",
    "etag": "\"1088a-exlbgkBGNb+P6/vCM4TWkU64Mko\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/mockup03@2x.cba11add.webp"
  },
  "/_nuxt/ntree.c8e13021.svg": {
    "type": "image/svg+xml",
    "etag": "\"3eb-sWdrY32j098P+R/JZ0mTi4CAdZk\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/ntree.c8e13021.svg"
  },
  "/_nuxt/old-7fa6c6fb.mjs": {
    "type": "application/javascript",
    "etag": "\"138a-O4sOERRyDrdf7QcQQOVihC3iMf4\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/old-7fa6c6fb.mjs"
  },
  "/_nuxt/people-b03c6dfd.mjs": {
    "type": "application/javascript",
    "etag": "\"11b-R5fjF/SQOwMjJwvS7xhV8XGQXU0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/people-b03c6dfd.mjs"
  },
  "/_nuxt/peoples.2a1a40f4.svg": {
    "type": "image/svg+xml",
    "etag": "\"49d-MmjFBu68EahIk0VhX0UVVbdSlHo\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/peoples.2a1a40f4.svg"
  },
  "/_nuxt/permission-f6a4b5db.mjs": {
    "type": "application/javascript",
    "etag": "\"10a-S+2Pl+n91P2Urlnbl8/+AGF7P7Y\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/permission-f6a4b5db.mjs"
  },
  "/_nuxt/permissions-60d8d3fe.mjs": {
    "type": "application/javascript",
    "etag": "\"11d-WIpvhudx/Y9D99Xb7mFLw1fdw5E\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/permissions-60d8d3fe.mjs"
  },
  "/_nuxt/plan_info_img.b2511fba.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ac78-iTHxITbCe52fCEwjoCHY+pEa28E\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/plan_info_img.b2511fba.svg"
  },
  "/_nuxt/privacy-bf963562.mjs": {
    "type": "application/javascript",
    "etag": "\"61fa-Y9J2np9cr2nSaKflba82nBH3N5c\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/privacy-bf963562.mjs"
  },
  "/_nuxt/record.9f36145b.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fd-kqlxza0XfsIOW8pzJ2aH98Zsvn4\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/record.9f36145b.svg"
  },
  "/_nuxt/register-c3fb0f53.mjs": {
    "type": "application/javascript",
    "etag": "\"1ea-ARQNzB6orSC0BuO2BJ0WTKn1Bys\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/register-c3fb0f53.mjs"
  },
  "/_nuxt/roles-078eb79f.mjs": {
    "type": "application/javascript",
    "etag": "\"116-+gOYH1UDKUA1esykcg0yzB2PCXQ\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/roles-078eb79f.mjs"
  },
  "/_nuxt/sd.de0e25d4.svg": {
    "type": "image/svg+xml",
    "etag": "\"10047-0Ms35AifiiUoclTS34pJvWfVSZ0\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/sd.de0e25d4.svg"
  },
  "/_nuxt/secured.4e414d30.svg": {
    "type": "image/svg+xml",
    "etag": "\"385-A850ENq1M0gGtyH6tD+yNyQ4wvE\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/secured.4e414d30.svg"
  },
  "/_nuxt/settings-34b89e7d.mjs": {
    "type": "application/javascript",
    "etag": "\"24d-iRDoJPTcHJWK6GiR9IU1r5MOarA\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/settings-34b89e7d.mjs"
  },
  "/_nuxt/show-0514d9a1.mjs": {
    "type": "application/javascript",
    "etag": "\"e6-BA5qwzlkRDG88l4JiAU6IloH+k4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-0514d9a1.mjs"
  },
  "/_nuxt/show-07e9ac43.mjs": {
    "type": "application/javascript",
    "etag": "\"ee-PGERA/4nen2UUV98ylzAwTL54LU\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-07e9ac43.mjs"
  },
  "/_nuxt/show-1519cd34.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-rZlMzreTSBz3yIMN/PwTvUec5kQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-1519cd34.mjs"
  },
  "/_nuxt/show-1ad34bf0.mjs": {
    "type": "application/javascript",
    "etag": "\"f6-4C+skYm2Iw2MbUwyJJEM3xI0ULM\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-1ad34bf0.mjs"
  },
  "/_nuxt/show-1c40bdfd.mjs": {
    "type": "application/javascript",
    "etag": "\"421-AZBsNfQmUhkiTeVRb/9Q1osY2J0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-1c40bdfd.mjs"
  },
  "/_nuxt/show-1e09f2b1.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-mAvbJIGu9ahX+Yr5Roe5I9LyRDo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-1e09f2b1.mjs"
  },
  "/_nuxt/show-1f769699.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-I1KxdHuHyH2B89782lRD1HvQutc\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-1f769699.mjs"
  },
  "/_nuxt/show-224ea536.mjs": {
    "type": "application/javascript",
    "etag": "\"f3-q36GwBeZDrtkORF5HavODIOYjts\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-224ea536.mjs"
  },
  "/_nuxt/show-24833506.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-gbMHskusS7DnvpjfKj38KNjKCl0\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-24833506.mjs"
  },
  "/_nuxt/show-2d12403f.mjs": {
    "type": "application/javascript",
    "etag": "\"f7-YcfszdSfJFHLDxm9XcWBvnZ/wQM\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-2d12403f.mjs"
  },
  "/_nuxt/show-2d49832e.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-eTtM+dTPTzbPc5sD/kYoXiX47fk\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-2d49832e.mjs"
  },
  "/_nuxt/show-2d66d018.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-Wezn51f62iw3waIwtF1J/4hGdcw\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-2d66d018.mjs"
  },
  "/_nuxt/show-323222e0.mjs": {
    "type": "application/javascript",
    "etag": "\"ef-Zwy/WRg4TAMZp7IihsGMkwzqY40\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-323222e0.mjs"
  },
  "/_nuxt/show-365199c1.mjs": {
    "type": "application/javascript",
    "etag": "\"a9-aM5HTYPbK7LoQxsT8cej2CIl6GY\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-365199c1.mjs"
  },
  "/_nuxt/show-42c2e1dc.mjs": {
    "type": "application/javascript",
    "etag": "\"14a-ydOtI5Y0Skt40grIKA3pOE+5ucI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-42c2e1dc.mjs"
  },
  "/_nuxt/show-466fd58e.mjs": {
    "type": "application/javascript",
    "etag": "\"100-mpwbAiIDjNJ69NkNg4papV8L+Mo\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-466fd58e.mjs"
  },
  "/_nuxt/show-4f694335.mjs": {
    "type": "application/javascript",
    "etag": "\"164-+3B5EPESOYnzCjpAFEZgWaOOAiA\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-4f694335.mjs"
  },
  "/_nuxt/show-50a5b30a.mjs": {
    "type": "application/javascript",
    "etag": "\"100-o4UGVFat8MA0fgMD+geG9ZkHKIY\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-50a5b30a.mjs"
  },
  "/_nuxt/show-59ea47f1.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-NeR7ZPGgo1FL15TYXeFfdIy1qXM\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-59ea47f1.mjs"
  },
  "/_nuxt/show-5d9f4096.mjs": {
    "type": "application/javascript",
    "etag": "\"106-lCaTqIzo7M/g/4ZG5SpQblrTk4M\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-5d9f4096.mjs"
  },
  "/_nuxt/show-66b42879.mjs": {
    "type": "application/javascript",
    "etag": "\"e1-QI9hlfnKbzDM2WPVLaJR7JjybKo\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-66b42879.mjs"
  },
  "/_nuxt/show-8e725a3e.mjs": {
    "type": "application/javascript",
    "etag": "\"ef-/4R9COrH9WjK6YdodO+QE2Tj7is\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-8e725a3e.mjs"
  },
  "/_nuxt/show-9354dae3.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-mV1aUCc9r5RTufXZ+1TfjJmM2F4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-9354dae3.mjs"
  },
  "/_nuxt/show-a27c7960.mjs": {
    "type": "application/javascript",
    "etag": "\"e4-4Xg7LDaXqnCZLpOWYrRT1uzRPJw\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-a27c7960.mjs"
  },
  "/_nuxt/show-a852c366.mjs": {
    "type": "application/javascript",
    "etag": "\"ed-lw3cLU2nXTceVIa9uBHvYobOVuU\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-a852c366.mjs"
  },
  "/_nuxt/show-aa0b926c.mjs": {
    "type": "application/javascript",
    "etag": "\"f3-LRAH4lfNxRqvCOTKK2UKF9tuuDw\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-aa0b926c.mjs"
  },
  "/_nuxt/show-acc43519.mjs": {
    "type": "application/javascript",
    "etag": "\"f5-bN2Gl1sOShhw465t420WqvTox1s\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-acc43519.mjs"
  },
  "/_nuxt/show-b1f0ec9c.mjs": {
    "type": "application/javascript",
    "etag": "\"139-OjJxwEaG+BBVMMlwFnIlFIPopYY\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-b1f0ec9c.mjs"
  },
  "/_nuxt/show-d53c7c03.mjs": {
    "type": "application/javascript",
    "etag": "\"106-LKO0hCh+jpXs8Se4VV1KX7cHRjA\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-d53c7c03.mjs"
  },
  "/_nuxt/show-d6077c7a.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-cDmJJT6K8B9LIUeRc8025dkgSNQ\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-d6077c7a.mjs"
  },
  "/_nuxt/show-d6563ca2.mjs": {
    "type": "application/javascript",
    "etag": "\"545-xZ/aDiN5U05SZYLSl2D1gYD1c6I\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-d6563ca2.mjs"
  },
  "/_nuxt/show-ed5c3e34.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-CA0le7ef3MX6EQVsHWkX83fwu7Y\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/show-ed5c3e34.mjs"
  },
  "/_nuxt/show-f71aae73.mjs": {
    "type": "application/javascript",
    "etag": "\"e5-pHcZVm7iJ7iT5pet24+X21wa/mo\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/show-f71aae73.mjs"
  },
  "/_nuxt/social-callback-722e9e06.mjs": {
    "type": "application/javascript",
    "etag": "\"498-pf7oHE00mdaxQwpxqY93dVCrnnY\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/social-callback-722e9e06.mjs"
  },
  "/_nuxt/system-d6232025.mjs": {
    "type": "application/javascript",
    "etag": "\"f7-jlM+22U0z+DB4XNBJol2dP9IhQw\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/system-d6232025.mjs"
  },
  "/_nuxt/tasks-62ba4493.mjs": {
    "type": "application/javascript",
    "etag": "\"f9-S3Q4PVn+t59zc0Jd9Et2SJ8ao4w\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/tasks-62ba4493.mjs"
  },
  "/_nuxt/teams-752b0a87.mjs": {
    "type": "application/javascript",
    "etag": "\"956-6F7vX2HNgVpPYzb3IJNMTI/q5t4\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/teams-752b0a87.mjs"
  },
  "/_nuxt/termsandconditions-2ecc37c7.mjs": {
    "type": "application/javascript",
    "etag": "\"4465-GGWT/Ttc3PVH+uaV2YijWz16Zc0\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/termsandconditions-2ecc37c7.mjs"
  },
  "/_nuxt/tutorials-2292c5b7.mjs": {
    "type": "application/javascript",
    "etag": "\"119-2XZ8di4wmH6HEBmE/VkfZBrRrfM\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/tutorials-2292c5b7.mjs"
  },
  "/_nuxt/upload.685963e0.svg": {
    "type": "image/svg+xml",
    "etag": "\"4d2-YPzEMbCKqJ231jc26QS8qxnuIKQ\"",
    "mtime": "2022-03-02T17:35:15.261Z",
    "path": "../public/_nuxt/upload.685963e0.svg"
  },
  "/_nuxt/usergroups-ea5ad0e6.mjs": {
    "type": "application/javascript",
    "etag": "\"129-0vS0bd01QVLaggRGAw7mBPTaSeI\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/usergroups-ea5ad0e6.mjs"
  },
  "/_nuxt/users-4aa63b42.mjs": {
    "type": "application/javascript",
    "etag": "\"11e-dnCncslNi7EPNjidgg6bMWvS43k\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/users-4aa63b42.mjs"
  },
  "/_nuxt/verification-74d1e452.mjs": {
    "type": "application/javascript",
    "etag": "\"a0-h8RS8akVWKZXZFxaZXlQ9mDzZIM\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/verification-74d1e452.mjs"
  },
  "/_nuxt/verify-51524878.mjs": {
    "type": "application/javascript",
    "etag": "\"324-33JXIDRVXas4DgGCdR86QjPS6tQ\"",
    "mtime": "2022-03-02T17:35:15.263Z",
    "path": "../public/_nuxt/verify-51524878.mjs"
  },
  "/_nuxt/videos-9872cf81.mjs": {
    "type": "application/javascript",
    "etag": "\"1840-gGZ3DuYy2RlGbaC8zhKB+gQrQTQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/videos-9872cf81.mjs"
  },
  "/_nuxt/_person-36a14345.mjs": {
    "type": "application/javascript",
    "etag": "\"2c8-BoJXT495dpcJb2SrB+IcB/GtiUs\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/_person-36a14345.mjs"
  },
  "/_nuxt/_token-378287f6.mjs": {
    "type": "application/javascript",
    "etag": "\"5c0-WX1fTfCdsx7igZnVXF9S0+AtjhQ\"",
    "mtime": "2022-03-02T17:35:15.262Z",
    "path": "../public/_nuxt/_token-378287f6.mjs"
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
const STATIC_ASSETS_BASE = "/_nuxt/D:/task/family365/nuxt/dist" + "/" + "1646242455";
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
