import api from "../composables/api";

export default defineNuxtPlugin((nuxt) => {
  nuxt.api = api;
});
