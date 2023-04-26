<template>
  <div style="text-align: start">
    <h1>Login as admin</h1>
    <v-text-field
      class="mb-1"
      ref="username"
      @input="existUser = true"
      v-model="form.username"
      density="compact"
      :rules="[rules.required, rules.min, rules.existUser]"
      label="Username"
      variant="outlined"
      counter
    ></v-text-field>
    <v-text-field
      @input="existPassword = true"
      ref="password"
      v-model="form.password"
      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min, rules.existPassword]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      density="compact"
      variant="outlined"
      counter
      @click:append-inner="show1 = !show1"
    ></v-text-field>
    <nuxt-link to="forget">Forget password ?</nuxt-link>
    <div style="text-align: end">
      <v-btn
        class="mt-4 text-white"
        style="
          background: linear-gradient(
            -225deg,
            #ff057c 0%,
            #7c64d5 48%,
            #4cc3ff 100%
          );
        "
        @click="submit"
        >Login</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      existUser: true,
      existPassword: true,
      show1: false,
      show2: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        existUser: () => this.existUser || "Username is not exist",
        existPassword: () => this.existPassword || "Password is not correct",
      },
    };
  },
  methods: {
    async submit() {
      var check = true;
      for (const f of Object.keys(this.form)) {
        const result = await this.$refs[f].validate(true);
        if (result.length) {
          check = false;
        }
      }
      if (check) {
        const get = common.method(
          "get",
          api.getAdmin() + api.getUserName(this.form.username)
        );
        get.then((result) => {
          if (result.length) {
            if (this.form.password == result[0].password) {
              localStorage.setItem("adminId", result[0].id);
              this.$router.push("/home");
            } else {
              this.$refs.password.validate(true);
              this.existPassword = false;
            }
          } else {
            this.$refs.username.validate(true);
            this.existUser = false;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>