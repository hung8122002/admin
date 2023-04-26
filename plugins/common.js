import common from "../composables/common";

export default defineNuxtPlugin((nuxt) => {
  nuxt.common = common;
});
