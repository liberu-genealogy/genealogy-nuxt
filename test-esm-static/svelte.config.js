export default config;

import adapter from "@sveltejs/adapter-static";

export default {
  adapter: adapter(),
  kit: {
    target: "#svelte",
  },
};
