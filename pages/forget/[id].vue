<template>
  <div style="text-align: start">
    <h1>Change password</h1>
    <v-text-field
      ref="password"
      v-model="password"
      :rules="[rules.required, rules.min]"
      label="New Password"
      density="compact"
      variant="outlined"
      :type="show1 ? 'text' : 'password'"
      @click:append-inner="show1 = !show1"
      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    ></v-text-field>
    <v-text-field
      ref="cfPassword"
      v-model="cfPassword"
      :rules="[rules.required, rules.cfPassword]"
      label="Confirm Password"
      density="compact"
      variant="outlined"
      :type="show2 ? 'text' : 'password'"
      @click:append-inner="show2 = !show2"
      :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
    ></v-text-field>
    <div style="text-align: end">
      <v-btn
        class="mt-3 text-white"
        style="
          background: linear-gradient(
            -225deg,
            #ff057c 0%,
            #7c64d5 48%,
            #4cc3ff 100%
          );
        "
        :loading="loading"
        @click="submit"
        >Login</v-btn
      >
    </div>
    <v-snackbar location="top" v-model="snackbar" :timeout="time * 1000">
      Change password successfully, go to login page in {{ time }} seconds
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          <nuxt-link to="/">Login</nuxt-link>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
    
    <script>
export default {
  data() {
    return {
      password: "",
      cfPassword: "",
      show1: false,
      show2: false,
      snackbar: false,
      loading: false,
      time: 0,
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => !value || value.length >= 8 || "Min 8 characters",
        cfPassword: (value) =>
          this.password == value || "Confirm Password failed",
      },
    };
  },
  watch: {
    time() {
      this.myLoop();
    },
  },
  methods: {
    async submit() {
      const password = await this.$refs.password.validate(true);
      const cfPassword = await this.$refs.cfPassword.validate(true);
      if (!password.length && !cfPassword.length) {
        this.loading = true;
        const get = await common.method(
          "get",
          api.getAdmin() + `/${this.$route.params.id}`
        );
        get.password = this.password;
        const update = common.method(
          "put",
          api.getAdmin() + `/${this.$route.params.id}`,
          get
        );
        if (update) {
          this.time = 5;
          this.loading = false;
          this.snackbar = true;
        }
      }
    },

    myLoop() {
      if (this.time < 1) {
        this.$router.push("/");
        return;
      }
      setTimeout(() => {
        this.time--;
      }, 1000);
    },
  },
};
</script>
    
    <style>
</style>