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
  "/_nuxt/403-e55361bd.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-RF/nmmIapWZE/am7/bPWLHLpkgM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/403-e55361bd.mjs"
  },
  "/_nuxt/404-5bf563fa.mjs": {
    "type": "application/javascript",
    "etag": "\"1f5-Zj25aoRWh5xOU7G8s+QmOPLYaQQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/404-5bf563fa.mjs"
  },
  "/_nuxt/503-23a7fb6a.mjs": {
    "type": "application/javascript",
    "etag": "\"238-o1CgoYqPc8xj7R9oMX6VYCMdWxc\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/503-23a7fb6a.mjs"
  },
  "/_nuxt/activitylog-71d60b7d.mjs": {
    "type": "application/javascript",
    "etag": "\"339-SSvGypElpfQXx/XWDuzhrITfcsE\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/activitylog-71d60b7d.mjs"
  },
  "/_nuxt/administration-e3f19564.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-u6AGLrGPFBN3zfDGvnyMe28T3zE\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/administration-e3f19564.mjs"
  },
  "/_nuxt/auth-6c10edc1.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3-sejOxciVJ9+rVu85AppETcplR7E\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/auth-6c10edc1.mjs"
  },
  "/_nuxt/auth-b1c31ef8.mjs": {
    "type": "application/javascript",
    "etag": "\"1ac-fHA57gx5Af+Fta2N18D4AMkKncM\"",
    "mtime": "2022-03-02T22:22:59.389Z",
    "path": "../public/_nuxt/auth-b1c31ef8.mjs"
  },
  "/_nuxt/calendar-345f9990.mjs": {
    "type": "application/javascript",
    "etag": "\"44c-v4zvbv0vf4XkahomFGdiyDdIGVQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/calendar-345f9990.mjs"
  },
  "/_nuxt/Checkmark.3a02cf8a.svg": {
    "type": "image/svg+xml",
    "etag": "\"483-IgmNcsPyMkH0iaSywhH9io0xMIs\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/Checkmark.3a02cf8a.svg"
  },
  "/_nuxt/colors.ab7bce47.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ea4-iEYJn2Y2dZxpuy8IJERCSZ2EOkE\"",
    "mtime": "2022-03-02T22:22:59.389Z",
    "path": "../public/_nuxt/colors.ab7bce47.css"
  },
  "/_nuxt/companies-6927bfe2.mjs": {
    "type": "application/javascript",
    "etag": "\"121-2SWXGrtV23W7IlYVSbZGJAV/h2k\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/companies-6927bfe2.mjs"
  },
  "/_nuxt/configure-f5862eed.mjs": {
    "type": "application/javascript",
    "etag": "\"71d-T4ffVvTcUoZqx4T0Dcu8S5+fnTg\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/configure-f5862eed.mjs"
  },
  "/_nuxt/create-0455b395.mjs": {
    "type": "application/javascript",
    "etag": "\"1fc-5/yibQXqf3xFeCHFCYMSUh6ZbNw\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-0455b395.mjs"
  },
  "/_nuxt/create-05bff8cf.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-BW9oTyjc49ZjjWc1EkXe57/Pxo0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-05bff8cf.mjs"
  },
  "/_nuxt/create-072f693e.mjs": {
    "type": "application/javascript",
    "etag": "\"1fd-nltYXA6HJwsO8twqMKtMlucwi00\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-072f693e.mjs"
  },
  "/_nuxt/create-0ddb6e15.mjs": {
    "type": "application/javascript",
    "etag": "\"19e-8chJQ26XoYUEgFXqd2XYF+yVO3s\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-0ddb6e15.mjs"
  },
  "/_nuxt/create-1d24f5d7.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-JyWGAuXMNHxsBJEvGg0tB1/FKZM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-1d24f5d7.mjs"
  },
  "/_nuxt/create-1deb6c0e.mjs": {
    "type": "application/javascript",
    "etag": "\"1bc-dYo/l6Zd59Fw50HBW3KpTwGFerM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-1deb6c0e.mjs"
  },
  "/_nuxt/create-20e001ce.mjs": {
    "type": "application/javascript",
    "etag": "\"19e-8chJQ26XoYUEgFXqd2XYF+yVO3s\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-20e001ce.mjs"
  },
  "/_nuxt/create-21c83440.mjs": {
    "type": "application/javascript",
    "etag": "\"1f8-S0EiefApuUlaSLb/KVt8+IA4bf4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-21c83440.mjs"
  },
  "/_nuxt/create-2b1f0d3e.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-3KoaggWf4HsvdAwAvtTdb6dJnP0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-2b1f0d3e.mjs"
  },
  "/_nuxt/create-346b6d9a.mjs": {
    "type": "application/javascript",
    "etag": "\"1db-yf/kVUwv1m+wHoTzxhfjbcCNZHE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-346b6d9a.mjs"
  },
  "/_nuxt/create-3f66d721.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-iN2LsAy3n2Yu74hyWcUeRtuIvZ8\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-3f66d721.mjs"
  },
  "/_nuxt/create-45d2266e.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-49G5EONmNlGj96BDAezl8XqFvQM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-45d2266e.mjs"
  },
  "/_nuxt/create-4cc0e132.mjs": {
    "type": "application/javascript",
    "etag": "\"189-r1rsuGKL5HNdpTn3XdTG1nULO9E\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-4cc0e132.mjs"
  },
  "/_nuxt/create-5df09a65.mjs": {
    "type": "application/javascript",
    "etag": "\"1f0-70FCG5NbtIyTQuAH3741rT0Ch2k\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-5df09a65.mjs"
  },
  "/_nuxt/create-7392c717.mjs": {
    "type": "application/javascript",
    "etag": "\"1e0-b99Giip6MiLtTz+IYs9gRKtrfb4\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-7392c717.mjs"
  },
  "/_nuxt/create-74abb511.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-1ilVp89qUMzqmEwaJ6HCeUICLrQ\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-74abb511.mjs"
  },
  "/_nuxt/create-75865666.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-93hgTaN/dHugxkF8R7yZCaZV99E\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-75865666.mjs"
  },
  "/_nuxt/create-7b003da4.mjs": {
    "type": "application/javascript",
    "etag": "\"1b7-rFVxg1QgKxfCJzLVNqBxWZ+opZ8\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-7b003da4.mjs"
  },
  "/_nuxt/create-8d97f365.mjs": {
    "type": "application/javascript",
    "etag": "\"c8d-AsNrXsiFhD0+V5JRz8WYznF4B8Q\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-8d97f365.mjs"
  },
  "/_nuxt/create-92096202.mjs": {
    "type": "application/javascript",
    "etag": "\"1f7-PZtRbGdvAkoseQDt3pHG7nXF0yc\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-92096202.mjs"
  },
  "/_nuxt/create-971214c5.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-h2qkr8bJgbjUIJ0EjOawywgqJfM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-971214c5.mjs"
  },
  "/_nuxt/create-a035fd33.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-TbZKAKITlyWPYwfmp1UvHJyfwFI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-a035fd33.mjs"
  },
  "/_nuxt/create-a87dc790.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-Z+rtfbmhY5egus2sUxyuJu1hNJE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-a87dc790.mjs"
  },
  "/_nuxt/create-aa6f0796.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-TFgGFdT1kfo5uvNrBPN8w8E01Qg\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-aa6f0796.mjs"
  },
  "/_nuxt/create-af5ade3c.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6-GKZ3AgMHisJBoDxdA8I/XnvJKnk\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-af5ade3c.mjs"
  },
  "/_nuxt/create-b3aeb994.mjs": {
    "type": "application/javascript",
    "etag": "\"1b6-i9GvsAskBB4/bB3pHYbsJdOE1Zs\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-b3aeb994.mjs"
  },
  "/_nuxt/create-c65330f7.mjs": {
    "type": "application/javascript",
    "etag": "\"1be-L4Z7mGkWleBtOe11Fbrx5ZtLujM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-c65330f7.mjs"
  },
  "/_nuxt/create-c6baaded.mjs": {
    "type": "application/javascript",
    "etag": "\"1bf-u2SzbIgxY0HXvP/8lF8bVDNaT1M\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-c6baaded.mjs"
  },
  "/_nuxt/create-c8c9ae00.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-dDL6T5HqnvRwJH2jvbi1jati20Y\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-c8c9ae00.mjs"
  },
  "/_nuxt/create-c946e1d5.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-cOAvxIlDMC/5nyYqZYYx3H5fFes\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-c946e1d5.mjs"
  },
  "/_nuxt/create-c9adf68c.mjs": {
    "type": "application/javascript",
    "etag": "\"1ef-p8nt8CcnhbSVBzowf85tIMkE4PA\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-c9adf68c.mjs"
  },
  "/_nuxt/create-cedc33ff.mjs": {
    "type": "application/javascript",
    "etag": "\"1f2-WaTquFHratI5UXey8uUjMDDxO0k\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-cedc33ff.mjs"
  },
  "/_nuxt/create-d6fc8d3c.mjs": {
    "type": "application/javascript",
    "etag": "\"1de-AETr7gLnsRZNUhn7f3DP91E4WL0\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-d6fc8d3c.mjs"
  },
  "/_nuxt/create-dd036963.mjs": {
    "type": "application/javascript",
    "etag": "\"1dd-SGUj9kVCQuGzUkdtWN+vqEcpbyQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-dd036963.mjs"
  },
  "/_nuxt/create-e27760a3.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-VDZQdsBMNLw98vlhUDIYDZaQu2E\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-e27760a3.mjs"
  },
  "/_nuxt/create-e662d3c2.mjs": {
    "type": "application/javascript",
    "etag": "\"1ba-cDjgjf1zo03H7xBkOnoCGE/d8es\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-e662d3c2.mjs"
  },
  "/_nuxt/create-ee6debab.mjs": {
    "type": "application/javascript",
    "etag": "\"202-fUm0vfJfTfDdeM8VYhZpGhnLpCM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-ee6debab.mjs"
  },
  "/_nuxt/create-f44b576b.mjs": {
    "type": "application/javascript",
    "etag": "\"2c4-DgZKNKPzsWR7movvLyjCD+7tK1w\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/create-f44b576b.mjs"
  },
  "/_nuxt/create-fd184a66.mjs": {
    "type": "application/javascript",
    "etag": "\"1e2-+fAqeOPQZQK1nvAU65ynT1Ruqdg\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/create-fd184a66.mjs"
  },
  "/_nuxt/dashboard-3b2ba9c6.mjs": {
    "type": "application/javascript",
    "etag": "\"1fc1-1YYNdxof7o0K0cfNmQEXtqQbJSU\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/dashboard-3b2ba9c6.mjs"
  },
  "/_nuxt/data-adaf28d7.mjs": {
    "type": "application/javascript",
    "etag": "\"6d5-oMucvo7acObqa2pfBmMzBGpGmuE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/data-adaf28d7.mjs"
  },
  "/_nuxt/default-b67dfd9f.mjs": {
    "type": "application/javascript",
    "etag": "\"1a7-e+ExtkLx+OGWkc7nB2/grlrCn0g\"",
    "mtime": "2022-03-02T22:22:59.389Z",
    "path": "../public/_nuxt/default-b67dfd9f.mjs"
  },
  "/_nuxt/edit-07c76cf2.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-wG5+WNewgkrhYjSzT2PKehF4Da4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-07c76cf2.mjs"
  },
  "/_nuxt/edit-09b44ae6.mjs": {
    "type": "application/javascript",
    "etag": "\"5bc-xwBcknkjHdS7NQr5VnYtGkDw9iE\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-09b44ae6.mjs"
  },
  "/_nuxt/edit-14a7a840.mjs": {
    "type": "application/javascript",
    "etag": "\"1ed-UT+pi8/XcF1A+yWMHzkAmXDLTQ8\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-14a7a840.mjs"
  },
  "/_nuxt/edit-1876aec7.mjs": {
    "type": "application/javascript",
    "etag": "\"1e2-jV6RwwKdjctC68oiVhxvgUXwvkc\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-1876aec7.mjs"
  },
  "/_nuxt/edit-1e37db5f.mjs": {
    "type": "application/javascript",
    "etag": "\"810-Bv7HNnu9rS521Fcrdfb9Sdlhb9Q\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-1e37db5f.mjs"
  },
  "/_nuxt/edit-3f225879.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-EBrDfOa7StpCLE41vgLZt7LYMrQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-3f225879.mjs"
  },
  "/_nuxt/edit-41cd686e.mjs": {
    "type": "application/javascript",
    "etag": "\"1fe-hoOATgmwbG2RVDEUhoomT/k3bF0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-41cd686e.mjs"
  },
  "/_nuxt/edit-41ef7a7d.mjs": {
    "type": "application/javascript",
    "etag": "\"1d9-x1CmtJBoaCOl8Tnn7bIYJqD1oEo\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-41ef7a7d.mjs"
  },
  "/_nuxt/edit-53b1b9cd.mjs": {
    "type": "application/javascript",
    "etag": "\"1e9-Jon6vwYcCXBIuPY5G1W4v4bbwXI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-53b1b9cd.mjs"
  },
  "/_nuxt/edit-57f05599.mjs": {
    "type": "application/javascript",
    "etag": "\"1fe-g4EXoIDMJu2+RnTD1SQxnNKKpK8\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-57f05599.mjs"
  },
  "/_nuxt/edit-5be3ebff.mjs": {
    "type": "application/javascript",
    "etag": "\"1dc-Dtd34Zkuu4kOJW6VDTP8RlHKp94\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-5be3ebff.mjs"
  },
  "/_nuxt/edit-60a341b8.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-KDehQH2ZvweugmHPOUZ/QG5+AuQ\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-60a341b8.mjs"
  },
  "/_nuxt/edit-698ae9a4.mjs": {
    "type": "application/javascript",
    "etag": "\"1f3-ItinvLz4Ir1N0+b1XIe6jRSFD+Q\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-698ae9a4.mjs"
  },
  "/_nuxt/edit-6a67042b.mjs": {
    "type": "application/javascript",
    "etag": "\"1e6-JURigz3QXgpNm0OFeyqUwx2DBoQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-6a67042b.mjs"
  },
  "/_nuxt/edit-6fc55f73.mjs": {
    "type": "application/javascript",
    "etag": "\"1d9-3/CBJz9+mUyORDvWaB9xfHu2FkQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-6fc55f73.mjs"
  },
  "/_nuxt/edit-73d9e4f9.mjs": {
    "type": "application/javascript",
    "etag": "\"1f4-NzfZX35ZgQm5JDZ0cBgSm9zgicM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-73d9e4f9.mjs"
  },
  "/_nuxt/edit-766f4314.mjs": {
    "type": "application/javascript",
    "etag": "\"f84-wOuP6SrwVb5SfcdffBKoUL9Dgs4\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-766f4314.mjs"
  },
  "/_nuxt/edit-7ae21bf2.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-iyES6Gf9yf5gLIi5/HQINPyJIcc\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-7ae21bf2.mjs"
  },
  "/_nuxt/edit-80252f41.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-VEpIFbCL2lTKgsdyvbnBSD10dbk\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-80252f41.mjs"
  },
  "/_nuxt/edit-8a9cc90a.mjs": {
    "type": "application/javascript",
    "etag": "\"185-Ktz/2P8xwzbzaZnj+ZkB6rRIPJ0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-8a9cc90a.mjs"
  },
  "/_nuxt/edit-91eecaa9.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-dQZdjGPWzjKTfgazwiMtF/Gm0oI\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-91eecaa9.mjs"
  },
  "/_nuxt/edit-95e5705e.mjs": {
    "type": "application/javascript",
    "etag": "\"1d1-v3Miz/zVvlBvFOdjgdMTXW3erZA\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-95e5705e.mjs"
  },
  "/_nuxt/edit-9c7207c6.mjs": {
    "type": "application/javascript",
    "etag": "\"1b8-u9C7yVFfx3ZLvfSRRrHPcd0q0K0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-9c7207c6.mjs"
  },
  "/_nuxt/edit-9e91449f.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-NYWN8uL9pnwYw+70N2cPxheNjNs\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-9e91449f.mjs"
  },
  "/_nuxt/edit-a40a387e.mjs": {
    "type": "application/javascript",
    "etag": "\"1f8-QXur31sv0kR09w/Vgv7dycDXxPw\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-a40a387e.mjs"
  },
  "/_nuxt/edit-a517f103.mjs": {
    "type": "application/javascript",
    "etag": "\"1ec-rVgicFF1Cg+okqMzxF2gSXEAS5o\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-a517f103.mjs"
  },
  "/_nuxt/edit-ab5ee84d.mjs": {
    "type": "application/javascript",
    "etag": "\"54f-kAZc9PAQYVhUotNJKEbpSM5HKB4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-ab5ee84d.mjs"
  },
  "/_nuxt/edit-b917d8f6.mjs": {
    "type": "application/javascript",
    "etag": "\"1c5-s95ALJ6gDevN7xNfUc9aiDjZzEI\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-b917d8f6.mjs"
  },
  "/_nuxt/edit-bcf13315.mjs": {
    "type": "application/javascript",
    "etag": "\"54a-jK66/BWLedaVff6IKeSGDQ3NFuE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-bcf13315.mjs"
  },
  "/_nuxt/edit-bcf1b409.mjs": {
    "type": "application/javascript",
    "etag": "\"1e4-YUjQt9JPwXZx4pwuxlGuoa2NANI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-bcf1b409.mjs"
  },
  "/_nuxt/edit-ca14c780.mjs": {
    "type": "application/javascript",
    "etag": "\"1a1-WH5kZ4sPjHAFqFDVe2o2Or/npCk\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-ca14c780.mjs"
  },
  "/_nuxt/edit-d54d9c62.mjs": {
    "type": "application/javascript",
    "etag": "\"1e0-I0HuTvQFsA8XueP+H41RtmLl4lU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-d54d9c62.mjs"
  },
  "/_nuxt/edit-d79dd916.mjs": {
    "type": "application/javascript",
    "etag": "\"31e-+AvsgP8rov5p4bWerzbGBsQlk+Q\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-d79dd916.mjs"
  },
  "/_nuxt/edit-dfa0d699.mjs": {
    "type": "application/javascript",
    "etag": "\"1e7-gdset5NPpadNiXKHeNNczxnfp8U\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-dfa0d699.mjs"
  },
  "/_nuxt/edit-e237f0fc.mjs": {
    "type": "application/javascript",
    "etag": "\"1ea-00t8Fn9/qLm2foeO1ROpUqdsolU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-e237f0fc.mjs"
  },
  "/_nuxt/edit-f8ff6d30.mjs": {
    "type": "application/javascript",
    "etag": "\"1a1-WH5kZ4sPjHAFqFDVe2o2Or/npCk\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-f8ff6d30.mjs"
  },
  "/_nuxt/edit-fbf8c548.mjs": {
    "type": "application/javascript",
    "etag": "\"1e3-+4dY6RE1rjT4meTNXBHbrVF+Cuo\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-fbf8c548.mjs"
  },
  "/_nuxt/edit-fc1591fc.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-KcvCzOcTi0wqaAFMF3S+gAPV8YY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/edit-fc1591fc.mjs"
  },
  "/_nuxt/edit-fde873b5.mjs": {
    "type": "application/javascript",
    "etag": "\"1eb-ZEQiWWci9kM5XPZRGcIyKGkgWM0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edit-fde873b5.mjs"
  },
  "/_nuxt/edittexts-8adb8ecd.mjs": {
    "type": "application/javascript",
    "etag": "\"1362-MhGfRnZ36G8w38jAPC58KlknwcM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/edittexts-8adb8ecd.mjs"
  },
  "/_nuxt/entry-28166600.mjs": {
    "type": "application/javascript",
    "etag": "\"2fd388-qVqgpkx73TG352kGqFQPnQ94TtA\"",
    "mtime": "2022-03-02T22:22:59.396Z",
    "path": "../public/_nuxt/entry-28166600.mjs"
  },
  "/_nuxt/entry.8a18453b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10cb90-Q51LE6EwRMkc+p0v8d1tcoK27cs\"",
    "mtime": "2022-03-02T22:22:59.394Z",
    "path": "../public/_nuxt/entry.8a18453b.css"
  },
  "/_nuxt/export-1edcfaba.mjs": {
    "type": "application/javascript",
    "etag": "\"9dc-jxbjDfWe42JaN+DKdwK2/Z/E6/w\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/export-1edcfaba.mjs"
  },
  "/_nuxt/export-7e8080d9.mjs": {
    "type": "application/javascript",
    "etag": "\"b43-dbZ9o30mvt8BgcGMwRGwLbOAyl0\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/export-7e8080d9.mjs"
  },
  "/_nuxt/families.3d9c3957.svg": {
    "type": "image/svg+xml",
    "etag": "\"428-qTd5Qr9RjATtIBz6abz8MUjXNFw\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/families.3d9c3957.svg"
  },
  "/_nuxt/files-2079bd7d.mjs": {
    "type": "application/javascript",
    "etag": "\"b7d-1cS4UUzWJ4HBhZQdWgp103EFjCg\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/files-2079bd7d.mjs"
  },
  "/_nuxt/footer-logo.5f2e1674.svg": {
    "type": "image/svg+xml",
    "etag": "\"1699-aDEWsiHD55w75e02xEejrzXwUJk\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/footer-logo.5f2e1674.svg"
  },
  "/_nuxt/gedcom.e2607d6f.svg": {
    "type": "image/svg+xml",
    "etag": "\"382-WwrxgmrqBsJrq3fyPTHJfIHVUnI\"",
    "mtime": "2022-03-02T22:22:59.348Z",
    "path": "../public/_nuxt/gedcom.e2607d6f.svg"
  },
  "/_nuxt/gimport.66edca1c.svg": {
    "type": "image/svg+xml",
    "etag": "\"43a-1CmSyWDKaw2nZpFeCwjSEkxok7I\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/gimport.66edca1c.svg"
  },
  "/_nuxt/github.e1450ac5.png": {
    "type": "image/png",
    "etag": "\"5fcd-IpzYtBKzzy4rAdbP5/V6SF2amXY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/github.e1450ac5.png"
  },
  "/_nuxt/google-24ff2858.mjs": {
    "type": "application/javascript",
    "etag": "\"e1-7lj7kmkuzlPxw72TKhAyoO6/RRE\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/google-24ff2858.mjs"
  },
  "/_nuxt/google.4a9b58b2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1d33-OTIbQqzLe5uGZGqUeNS4KkJjc8U\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/google.4a9b58b2.jpg"
  },
  "/_nuxt/import-5bd7267e.mjs": {
    "type": "application/javascript",
    "etag": "\"8ea-dgkDW4qYf9kgHgAROkdRPqEJwnM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/import-5bd7267e.mjs"
  },
  "/_nuxt/import.07b709e3.svg": {
    "type": "image/svg+xml",
    "etag": "\"3e4-YTs+4FDiAi2ONykkncefhfjBheg\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/import.07b709e3.svg"
  },
  "/_nuxt/index-01caf780.mjs": {
    "type": "application/javascript",
    "etag": "\"188-up/ChcRjMsa3OCJ4tOdKbIff5IU\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-01caf780.mjs"
  },
  "/_nuxt/index-01e004b7.mjs": {
    "type": "application/javascript",
    "etag": "\"c1-4xDP2V3+kCBkUxd07dDKBqgiw+c\"",
    "mtime": "2022-03-02T22:22:59.389Z",
    "path": "../public/_nuxt/index-01e004b7.mjs"
  },
  "/_nuxt/index-02dd639b.mjs": {
    "type": "application/javascript",
    "etag": "\"167-81cZwzHZzDM6pFM05cv658Q7CGo\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-02dd639b.mjs"
  },
  "/_nuxt/index-147105f4.mjs": {
    "type": "application/javascript",
    "etag": "\"1cd-zpc+VXSviWtQz8aJgxipo1GsUUg\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-147105f4.mjs"
  },
  "/_nuxt/index-1b3a3311.mjs": {
    "type": "application/javascript",
    "etag": "\"143-E0/s/bnZqeBqVWw2R+gmJVrwYcw\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-1b3a3311.mjs"
  },
  "/_nuxt/index-1d52a028.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-YU57mBlEp1aWpLAToUJ8zZ/TTY8\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-1d52a028.mjs"
  },
  "/_nuxt/index-1e2e9296.mjs": {
    "type": "application/javascript",
    "etag": "\"160-QM26cWG+2oaO3Z+K3IwLFkkEOdo\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-1e2e9296.mjs"
  },
  "/_nuxt/index-2023a7e1.mjs": {
    "type": "application/javascript",
    "etag": "\"165-I6Umb60KpFiq/24N+SO0YXqw8L4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-2023a7e1.mjs"
  },
  "/_nuxt/index-229173a4.mjs": {
    "type": "application/javascript",
    "etag": "\"17c-BLwJ1peARUpO7T2so6VJoKg4UuM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-229173a4.mjs"
  },
  "/_nuxt/index-22a3d6cf.mjs": {
    "type": "application/javascript",
    "etag": "\"158-ueX9AJYAGYa/oB340WHoz0ODrxM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-22a3d6cf.mjs"
  },
  "/_nuxt/index-25622547.mjs": {
    "type": "application/javascript",
    "etag": "\"165-lA7vhcnLBnLvm8k3UJLrdkxkAr4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-25622547.mjs"
  },
  "/_nuxt/index-290d8599.mjs": {
    "type": "application/javascript",
    "etag": "\"d9-0Knvif/clchqMdR9xZkDaHKpHyo\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-290d8599.mjs"
  },
  "/_nuxt/index-2e4540ad.mjs": {
    "type": "application/javascript",
    "etag": "\"163-xQKIKYIUjki3Q5EoCBveAlkHeGw\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-2e4540ad.mjs"
  },
  "/_nuxt/index-2eace7f8.mjs": {
    "type": "application/javascript",
    "etag": "\"32e-jeqiWFeGbMP23JKtFmbdiHKmHow\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-2eace7f8.mjs"
  },
  "/_nuxt/index-3029c1a7.mjs": {
    "type": "application/javascript",
    "etag": "\"154-7xN0Uv40/rvgf9tNnpzUnyTRx08\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-3029c1a7.mjs"
  },
  "/_nuxt/index-3c9202dd.mjs": {
    "type": "application/javascript",
    "etag": "\"101b-N5+2digkmGE9hYR9oUPhQfwEnbw\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-3c9202dd.mjs"
  },
  "/_nuxt/index-42311754.mjs": {
    "type": "application/javascript",
    "etag": "\"eb1-jD6hBCsZnwME0vUSm8F10oviIOY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-42311754.mjs"
  },
  "/_nuxt/index-4db555f2.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-G6TV5fp6cbbWyNSs/UjaLYDuIjA\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-4db555f2.mjs"
  },
  "/_nuxt/index-5311fc39.mjs": {
    "type": "application/javascript",
    "etag": "\"160-47Cb+JbIBETz6cRvo+5wTgKUlns\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-5311fc39.mjs"
  },
  "/_nuxt/index-56acb9fa.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-MQ8Ig7ZyM95XvzliVebSAOkK9uc\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-56acb9fa.mjs"
  },
  "/_nuxt/index-5ba4fdd6.mjs": {
    "type": "application/javascript",
    "etag": "\"165-sQqH4zrm7vO+K3ph086sZSR4xOs\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-5ba4fdd6.mjs"
  },
  "/_nuxt/index-5bce1c6a.mjs": {
    "type": "application/javascript",
    "etag": "\"1c9-t8Qu3IxhON46mKIdjFuSod/rKRk\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-5bce1c6a.mjs"
  },
  "/_nuxt/index-60abb1d6.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-YU57mBlEp1aWpLAToUJ8zZ/TTY8\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-60abb1d6.mjs"
  },
  "/_nuxt/index-679fe0c9.mjs": {
    "type": "application/javascript",
    "etag": "\"186-H9NGm2iIriQU7QJ9Hvl665OPb3Y\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-679fe0c9.mjs"
  },
  "/_nuxt/index-6b5d4ab3.mjs": {
    "type": "application/javascript",
    "etag": "\"40f-JldFvGPb+M/sXWF2Ka0MyFNQEM8\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-6b5d4ab3.mjs"
  },
  "/_nuxt/index-6cd06dc8.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-ox+cy20bYJ1mqRKobbfvfcDKnVk\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-6cd06dc8.mjs"
  },
  "/_nuxt/index-75161047.mjs": {
    "type": "application/javascript",
    "etag": "\"13a-REMhFUZN2xXq75Lt6WYRQKxvn5w\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-75161047.mjs"
  },
  "/_nuxt/index-7915b31d.mjs": {
    "type": "application/javascript",
    "etag": "\"9c1-qSzVxKduwoewK7D3xuNiV9I0MnQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-7915b31d.mjs"
  },
  "/_nuxt/index-79d82806.mjs": {
    "type": "application/javascript",
    "etag": "\"187-z5WInvsUrO7XbNaJiwBS2qP6jww\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-79d82806.mjs"
  },
  "/_nuxt/index-82bc8f2e.mjs": {
    "type": "application/javascript",
    "etag": "\"16e-up9EtYmrD0rE5iDEoSevx8kK6iI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-82bc8f2e.mjs"
  },
  "/_nuxt/index-831190fa.mjs": {
    "type": "application/javascript",
    "etag": "\"171-iDigREPW4JYxPphj4RYeOuua6zw\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-831190fa.mjs"
  },
  "/_nuxt/index-869e1a2a.mjs": {
    "type": "application/javascript",
    "etag": "\"12a6-BlGyM9irrcuuTDXM3DLDWMnEY4Y\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-869e1a2a.mjs"
  },
  "/_nuxt/index-87487d7d.mjs": {
    "type": "application/javascript",
    "etag": "\"30a-mHe4NTrI1S2n+w3Oj/qLKVmuCEA\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-87487d7d.mjs"
  },
  "/_nuxt/index-95d6c6f9.mjs": {
    "type": "application/javascript",
    "etag": "\"fa2-0R9ObaRZEmyyL795KRGQF5b/hUw\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-95d6c6f9.mjs"
  },
  "/_nuxt/index-9bba80e1.mjs": {
    "type": "application/javascript",
    "etag": "\"16f-Xy1zWWMMk2RqdMQBMXz17w1ISm4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-9bba80e1.mjs"
  },
  "/_nuxt/index-9d5269a7.mjs": {
    "type": "application/javascript",
    "etag": "\"d8-d/Ye/JZxNQSrI5BwGgG+xljWZTM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-9d5269a7.mjs"
  },
  "/_nuxt/index-9e299940.mjs": {
    "type": "application/javascript",
    "etag": "\"15e-auy0DGPb1Xz+jwA5/oKwpyUbais\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-9e299940.mjs"
  },
  "/_nuxt/index-9e846a8b.mjs": {
    "type": "application/javascript",
    "etag": "\"178-tUMt3gMJ+b+Wt0wjhjPk1MuUQVc\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-9e846a8b.mjs"
  },
  "/_nuxt/index-9fdcd40f.mjs": {
    "type": "application/javascript",
    "etag": "\"16a-sJ7QTrJkERpPzzUhBnOkhFbW0Bc\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-9fdcd40f.mjs"
  },
  "/_nuxt/index-a2f5989b.mjs": {
    "type": "application/javascript",
    "etag": "\"15a-7W4nKiWXvRAGMDCRXuazvKSpHzQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-a2f5989b.mjs"
  },
  "/_nuxt/index-ade8b946.mjs": {
    "type": "application/javascript",
    "etag": "\"17c-xz5R+6PmldG2/g7LX42QplDkeKM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-ade8b946.mjs"
  },
  "/_nuxt/index-b3a33f26.mjs": {
    "type": "application/javascript",
    "etag": "\"224-TZCnmjl/6zMkznL24Rk2UfS4184\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-b3a33f26.mjs"
  },
  "/_nuxt/index-b3e87695.mjs": {
    "type": "application/javascript",
    "etag": "\"1d4-PaKyLiDN9XsxyNtHWOVGmETmm0s\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-b3e87695.mjs"
  },
  "/_nuxt/index-ba02e871.mjs": {
    "type": "application/javascript",
    "etag": "\"138-YF7HWCnw4Vsj3fmo0pMXA6mKEP4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-ba02e871.mjs"
  },
  "/_nuxt/index-cb17576b.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-CEIehYJSz4Wnf5jSM2GbXv8CHdY\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-cb17576b.mjs"
  },
  "/_nuxt/index-ce56794d.mjs": {
    "type": "application/javascript",
    "etag": "\"159-DGI50PMOW1dDQxPUUqrxKKQimKY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-ce56794d.mjs"
  },
  "/_nuxt/index-d78c5b42.mjs": {
    "type": "application/javascript",
    "etag": "\"16c-fwYv6A7ckvw1VfWWKBOkfTeBBmM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-d78c5b42.mjs"
  },
  "/_nuxt/index-da0bbab7.mjs": {
    "type": "application/javascript",
    "etag": "\"1651-zc+wjZ9qz8vE6858WY5OXrzeHhg\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-da0bbab7.mjs"
  },
  "/_nuxt/index-e14aad34.mjs": {
    "type": "application/javascript",
    "etag": "\"201-ZkTl+QKgmDkeLRwIxxtC350q2dM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-e14aad34.mjs"
  },
  "/_nuxt/index-e215e993.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-e8zeR6bnTd7qWKNeBe03UJmLtHI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-e215e993.mjs"
  },
  "/_nuxt/index-e2dd8ee7.mjs": {
    "type": "application/javascript",
    "etag": "\"16d-YboDDCjAbDPPuTPzCVFs8jiBIN8\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-e2dd8ee7.mjs"
  },
  "/_nuxt/index-ed2adc95.mjs": {
    "type": "application/javascript",
    "etag": "\"166-8sK1wLbALzSYDT8zwI2ageSw/18\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/index-ed2adc95.mjs"
  },
  "/_nuxt/index-fb17b5ba.mjs": {
    "type": "application/javascript",
    "etag": "\"168-pSP78oKyRSWBr7/kcaltP/hu1wY\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/index-fb17b5ba.mjs"
  },
  "/_nuxt/inspire-8f15b047.mjs": {
    "type": "application/javascript",
    "etag": "\"1e8-QOdrmqQT3Mxnpn1XE+FYYmud9xA\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/inspire-8f15b047.mjs"
  },
  "/_nuxt/integrations-d890fd23.mjs": {
    "type": "application/javascript",
    "etag": "\"e7-Xo7F29wBujaByqIThDvr1UE1s0Y\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/integrations-d890fd23.mjs"
  },
  "/_nuxt/localisation-1516b46b.mjs": {
    "type": "application/javascript",
    "etag": "\"124-Y4JgqQvYDTetXcud88mhtgm+i8o\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/localisation-1516b46b.mjs"
  },
  "/_nuxt/login-2a5ad128.mjs": {
    "type": "application/javascript",
    "etag": "\"1ee-lVRILLP4MFwzFziaTP33gOv5Ees\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/login-2a5ad128.mjs"
  },
  "/_nuxt/logo.a5e075c8.svg": {
    "type": "image/svg+xml",
    "etag": "\"3782-tDaWYNRdx7R6zLXMZyolcPsaI1s\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/logo.a5e075c8.svg"
  },
  "/_nuxt/logo1.a5935c29.svg": {
    "type": "image/svg+xml",
    "etag": "\"1690-Ni9KJOE92q4KVikPL3Wr7+B3M2w\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/logo1.a5935c29.svg"
  },
  "/_nuxt/logs-ee46ff0c.mjs": {
    "type": "application/javascript",
    "etag": "\"11c-TIYeHUzY+yM3VuyaeZyjfFxe+HE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/logs-ee46ff0c.mjs"
  },
  "/_nuxt/manifest.json": {
    "type": "application/json",
    "etag": "\"ccd7-wYgoE4SdTp2G+o5PB7pDIhPE168\"",
    "mtime": "2022-03-02T22:22:59.340Z",
    "path": "../public/_nuxt/manifest.json"
  },
  "/_nuxt/menu-226fa8d2.mjs": {
    "type": "application/javascript",
    "etag": "\"fb-rCrGBFHkdKxpfm7KJBTk/eUEvzU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/menu-226fa8d2.mjs"
  },
  "/_nuxt/mockup01@2x.3841722f.webp": {
    "type": "image/webp",
    "etag": "\"d270-1YNsv1fAQnfkMzIZEIuEKzL1OBM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/mockup01@2x.3841722f.webp"
  },
  "/_nuxt/mockup02@2x.69a30983.webp": {
    "type": "image/webp",
    "etag": "\"8d36-6P7Ghcfyfutj7Se0zxT1C850fNM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/mockup02@2x.69a30983.webp"
  },
  "/_nuxt/mockup03@2x.cba11add.webp": {
    "type": "image/webp",
    "etag": "\"1088a-exlbgkBGNb+P6/vCM4TWkU64Mko\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/mockup03@2x.cba11add.webp"
  },
  "/_nuxt/ntree.c8e13021.svg": {
    "type": "image/svg+xml",
    "etag": "\"3eb-sWdrY32j098P+R/JZ0mTi4CAdZk\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/ntree.c8e13021.svg"
  },
  "/_nuxt/old-e9d38fee.mjs": {
    "type": "application/javascript",
    "etag": "\"138a-VrFNE6JT65NEP1dxgiRk6tuTp9I\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/old-e9d38fee.mjs"
  },
  "/_nuxt/people-2866c436.mjs": {
    "type": "application/javascript",
    "etag": "\"11b-gosTeq2VS4yZbvgnLpJL2heXSss\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/people-2866c436.mjs"
  },
  "/_nuxt/peoples.2a1a40f4.svg": {
    "type": "image/svg+xml",
    "etag": "\"49d-MmjFBu68EahIk0VhX0UVVbdSlHo\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/peoples.2a1a40f4.svg"
  },
  "/_nuxt/permission-f6a4b5db.mjs": {
    "type": "application/javascript",
    "etag": "\"10a-S+2Pl+n91P2Urlnbl8/+AGF7P7Y\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/permission-f6a4b5db.mjs"
  },
  "/_nuxt/permissions-cd0ebb30.mjs": {
    "type": "application/javascript",
    "etag": "\"11d-/Yp1c8X5YuQnyR8QeckmR7bIgUc\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/permissions-cd0ebb30.mjs"
  },
  "/_nuxt/plan_info_img.b2511fba.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ac78-iTHxITbCe52fCEwjoCHY+pEa28E\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/plan_info_img.b2511fba.svg"
  },
  "/_nuxt/privacy-be4b829a.mjs": {
    "type": "application/javascript",
    "etag": "\"61fa-F8EbyEQrj7XDJ+Oa83Is+S7FNlw\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/privacy-be4b829a.mjs"
  },
  "/_nuxt/record.9f36145b.svg": {
    "type": "image/svg+xml",
    "etag": "\"6fd-kqlxza0XfsIOW8pzJ2aH98Zsvn4\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/record.9f36145b.svg"
  },
  "/_nuxt/register-908bfb2a.mjs": {
    "type": "application/javascript",
    "etag": "\"1ea-UjLQ9iDstLN3J0pQNIETLAq6zkQ\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/register-908bfb2a.mjs"
  },
  "/_nuxt/roles-251c7427.mjs": {
    "type": "application/javascript",
    "etag": "\"116-Pj6m19cve6Ek+mSJBPugzGfE+TM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/roles-251c7427.mjs"
  },
  "/_nuxt/sd.de0e25d4.svg": {
    "type": "image/svg+xml",
    "etag": "\"10047-0Ms35AifiiUoclTS34pJvWfVSZ0\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/sd.de0e25d4.svg"
  },
  "/_nuxt/secured.4e414d30.svg": {
    "type": "image/svg+xml",
    "etag": "\"385-A850ENq1M0gGtyH6tD+yNyQ4wvE\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/secured.4e414d30.svg"
  },
  "/_nuxt/settings-cf3ceec2.mjs": {
    "type": "application/javascript",
    "etag": "\"24d-i3U+b0kLT+LUMxr+uwhsz4MUZ3c\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/settings-cf3ceec2.mjs"
  },
  "/_nuxt/show-017bb225.mjs": {
    "type": "application/javascript",
    "etag": "\"e4-A8aHCjV3Ur9K2MGddtvtOjhjaXQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-017bb225.mjs"
  },
  "/_nuxt/show-01edc963.mjs": {
    "type": "application/javascript",
    "etag": "\"e5-oqza5OaPKWXkGY597EnPZ6nRy6k\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-01edc963.mjs"
  },
  "/_nuxt/show-055307f7.mjs": {
    "type": "application/javascript",
    "etag": "\"100-OBb04eyUYRRsBJpwZLbp09DIxKo\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-055307f7.mjs"
  },
  "/_nuxt/show-0d953bcd.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-E3gBhWN9MOJhWwgmrCR/5KPVLXY\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-0d953bcd.mjs"
  },
  "/_nuxt/show-16172bfa.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-1pB7LdFN8AbgaWnX8yVggyXM4s0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-16172bfa.mjs"
  },
  "/_nuxt/show-1bfacc9d.mjs": {
    "type": "application/javascript",
    "etag": "\"a9-obcMTugnvciIP5Vu2BHuQKiwCj8\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-1bfacc9d.mjs"
  },
  "/_nuxt/show-2133fdb2.mjs": {
    "type": "application/javascript",
    "etag": "\"164-8UKf5Kztuc7UrX6qGH7CuHuDVuY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-2133fdb2.mjs"
  },
  "/_nuxt/show-37904545.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-d1PlYKR+ft0sxat9FroLVq5yMJE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-37904545.mjs"
  },
  "/_nuxt/show-3931e0c1.mjs": {
    "type": "application/javascript",
    "etag": "\"f6-syOCBOH6dwgAG5JMbrVBieCDWXU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-3931e0c1.mjs"
  },
  "/_nuxt/show-4d238da0.mjs": {
    "type": "application/javascript",
    "etag": "\"106-hxd7Gbi83eF3noLqwbY1JgOY4Gw\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-4d238da0.mjs"
  },
  "/_nuxt/show-5716d4b3.mjs": {
    "type": "application/javascript",
    "etag": "\"f7-YWFcHIOzyzGS01tM6A0ns94daKI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-5716d4b3.mjs"
  },
  "/_nuxt/show-58cbc0de.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-CCpVVszgHFjFmlNmPXoerwqXn7Q\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-58cbc0de.mjs"
  },
  "/_nuxt/show-5e56eb29.mjs": {
    "type": "application/javascript",
    "etag": "\"e1-myRmiDbDbKGw5fPiQ8DbstukgaY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-5e56eb29.mjs"
  },
  "/_nuxt/show-638aa27f.mjs": {
    "type": "application/javascript",
    "etag": "\"e9-PP6ZZ8paQKFdsA0xFvPchrX8iA4\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-638aa27f.mjs"
  },
  "/_nuxt/show-668f1e24.mjs": {
    "type": "application/javascript",
    "etag": "\"100-RxYceBuFSuyNabUVJQt3yFub5Gs\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-668f1e24.mjs"
  },
  "/_nuxt/show-6b268c4c.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-CtsecloOOcaBiOOXDG4HvyCSMKA\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-6b268c4c.mjs"
  },
  "/_nuxt/show-7626ccf8.mjs": {
    "type": "application/javascript",
    "etag": "\"e6-s9A1/l3NRD2+420yDOZSjuu62gM\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-7626ccf8.mjs"
  },
  "/_nuxt/show-7767fdcf.mjs": {
    "type": "application/javascript",
    "etag": "\"f1-M356MJJVPGFbi4jPCk08MYRs6nU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-7767fdcf.mjs"
  },
  "/_nuxt/show-8f0b8868.mjs": {
    "type": "application/javascript",
    "etag": "\"e3-9luZK4lzhCOjkVXV6CvG06vSKH4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-8f0b8868.mjs"
  },
  "/_nuxt/show-8f48b2b3.mjs": {
    "type": "application/javascript",
    "etag": "\"14a-q25n0HmnNaSB9KM3VAvPreB0OeY\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-8f48b2b3.mjs"
  },
  "/_nuxt/show-919f8e2b.mjs": {
    "type": "application/javascript",
    "etag": "\"ec-ltVEHo6SWNWGpbLA+pI4ygjiHSc\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-919f8e2b.mjs"
  },
  "/_nuxt/show-ae262cbc.mjs": {
    "type": "application/javascript",
    "etag": "\"421-CmQNAQ3S4hiE1i38W2/8QIhxKNs\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-ae262cbc.mjs"
  },
  "/_nuxt/show-b9b963e2.mjs": {
    "type": "application/javascript",
    "etag": "\"ee-h8HetE/TZAEFcadgdbj5/43VLcs\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-b9b963e2.mjs"
  },
  "/_nuxt/show-bc730ae1.mjs": {
    "type": "application/javascript",
    "etag": "\"f5-OFz4KJsdcPMks0KfQbu48ERAqek\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-bc730ae1.mjs"
  },
  "/_nuxt/show-c7955223.mjs": {
    "type": "application/javascript",
    "etag": "\"f3-fUA3ALyHt6e08ux/51mVQni7wNI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-c7955223.mjs"
  },
  "/_nuxt/show-cf63e253.mjs": {
    "type": "application/javascript",
    "etag": "\"106-O/yPdUIxs5l6Xh2svsAVmqxRROM\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-cf63e253.mjs"
  },
  "/_nuxt/show-d9f51af9.mjs": {
    "type": "application/javascript",
    "etag": "\"139-HM6hYDIJSH2mU4dgrKB89KKfXlg\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-d9f51af9.mjs"
  },
  "/_nuxt/show-e0ae8d89.mjs": {
    "type": "application/javascript",
    "etag": "\"f3-x6cdNVDjCOFdJkJjLKQ6t09dJPA\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/show-e0ae8d89.mjs"
  },
  "/_nuxt/show-e3d9ad24.mjs": {
    "type": "application/javascript",
    "etag": "\"ef-Xt1hj6NXUtsT6DzZshK132LaNnU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-e3d9ad24.mjs"
  },
  "/_nuxt/show-eab39b80.mjs": {
    "type": "application/javascript",
    "etag": "\"f0-SmCQjlyfvnlL7/vecChAEmkTbvg\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-eab39b80.mjs"
  },
  "/_nuxt/show-edfc06d7.mjs": {
    "type": "application/javascript",
    "etag": "\"ef-6sRu6VoQoq9jfJqaz5N/jmw5WdE\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-edfc06d7.mjs"
  },
  "/_nuxt/show-f3b42273.mjs": {
    "type": "application/javascript",
    "etag": "\"545-0UadwigMVTjXs+/YepXlUFCHHL0\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-f3b42273.mjs"
  },
  "/_nuxt/show-f5d27bd7.mjs": {
    "type": "application/javascript",
    "etag": "\"ed-qMuI0sQXBTWesTOJXY0/OFX7M/k\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/show-f5d27bd7.mjs"
  },
  "/_nuxt/social-callback-963e16fc.mjs": {
    "type": "application/javascript",
    "etag": "\"498-+cYWLRr/Syyuzn2nF79DOwmSEm4\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/social-callback-963e16fc.mjs"
  },
  "/_nuxt/system-8f4ae6ca.mjs": {
    "type": "application/javascript",
    "etag": "\"f7-20VbJ0/hkmNOKWAGSYM/s8Rup8c\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/system-8f4ae6ca.mjs"
  },
  "/_nuxt/tasks-d182b2bf.mjs": {
    "type": "application/javascript",
    "etag": "\"f9-MYRrSUw8ZjJAi9kKtqeZmzuSQaU\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/tasks-d182b2bf.mjs"
  },
  "/_nuxt/teams-19008173.mjs": {
    "type": "application/javascript",
    "etag": "\"956-7GRNpzmvFAMubCyS9AAoU77/i9E\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/teams-19008173.mjs"
  },
  "/_nuxt/termsandconditions-6e2e697e.mjs": {
    "type": "application/javascript",
    "etag": "\"4465-aXji090gkWN82NMceSeRbNMmPDk\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/termsandconditions-6e2e697e.mjs"
  },
  "/_nuxt/tutorials-1b2694f4.mjs": {
    "type": "application/javascript",
    "etag": "\"119-rcqb49jDiAcUi0fUPuQiUUhWRoI\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/tutorials-1b2694f4.mjs"
  },
  "/_nuxt/upload.685963e0.svg": {
    "type": "image/svg+xml",
    "etag": "\"4d2-YPzEMbCKqJ231jc26QS8qxnuIKQ\"",
    "mtime": "2022-03-02T22:22:59.386Z",
    "path": "../public/_nuxt/upload.685963e0.svg"
  },
  "/_nuxt/usergroups-09aba3be.mjs": {
    "type": "application/javascript",
    "etag": "\"129-ZFhYbu3SK0xkiRda0mqN2pLOkl0\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/usergroups-09aba3be.mjs"
  },
  "/_nuxt/users-a650f52f.mjs": {
    "type": "application/javascript",
    "etag": "\"11e-rxnFNctbOJfTZF3WmeXSJstpkMQ\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/users-a650f52f.mjs"
  },
  "/_nuxt/verification-74d1e452.mjs": {
    "type": "application/javascript",
    "etag": "\"a0-h8RS8akVWKZXZFxaZXlQ9mDzZIM\"",
    "mtime": "2022-03-02T22:22:59.389Z",
    "path": "../public/_nuxt/verification-74d1e452.mjs"
  },
  "/_nuxt/verify-e29e78bb.mjs": {
    "type": "application/javascript",
    "etag": "\"324-RgGKmT015Y5DjmlXORGI+4LMSys\"",
    "mtime": "2022-03-02T22:22:59.389Z",
    "path": "../public/_nuxt/verify-e29e78bb.mjs"
  },
  "/_nuxt/videos-035a86aa.mjs": {
    "type": "application/javascript",
    "etag": "\"1840-dwbPDWw1lqM66yd/xoNjmGDV3cU\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/videos-035a86aa.mjs"
  },
  "/_nuxt/_person-3d97b9b4.mjs": {
    "type": "application/javascript",
    "etag": "\"2c8-NETn0RK8qEdY7YQzlVDjeAhm+Bc\"",
    "mtime": "2022-03-02T22:22:59.387Z",
    "path": "../public/_nuxt/_person-3d97b9b4.mjs"
  },
  "/_nuxt/_token-2d1d0c31.mjs": {
    "type": "application/javascript",
    "etag": "\"5c0-1sTXzbEa/RIdd9LE/6iHohGf1nY\"",
    "mtime": "2022-03-02T22:22:59.388Z",
    "path": "../public/_nuxt/_token-2d1d0c31.mjs"
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
const STATIC_ASSETS_BASE = "/_nuxt/D:/task/family365/nuxt/dist" + "/" + "1646259751";
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
