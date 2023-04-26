<template>
  <div style="text-align: start">
    <h1>Enter your email</h1>
    <v-text-field
      ref="email"
      v-model="email"
      :rules="[rules.required, rules.emailMatch, rules.existEmail]"
      label="Email"
      density="compact"
      variant="outlined"
      @click:append="show1 = !show1"
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
        @click="submit"
        >Login</v-btn
      >
    </div>
    <v-snackbar location="top" v-model="snackbar" timeout="2000">
      Check your email to change your password
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      existEmail: false,
      snackbar: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => !value || value.length >= 8 || "Min 8 characters",
        cfPassword: (value) =>
          this.password.newPassword == value || "Confirm Password failed",
        emailMatch: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        existEmail: () => !this.existEmail || "Email is not exist",
      },
    };
  },
  methods: {
    async submit() {
      const result = await this.$refs.email.validate(true);
      if (!result.length) {
        const getEmail = await common.method(
          "get",
          api.getAdmin() + api.getEmail(this.email)
        );
        if (getEmail.length) {
          const check = common.sendMail({
            action: "Reset your password",
            link: `http://localhost:3001/forget/${getEmail[0].id}`,
            email_to: this.email,
          });
          if (check) {
            this.snackbar = true;
          }
        } else {
          this.existEmail = true;
          this.$refs.email.validate(true);
        }
      }
    },
  },
};
</script>

<style>
</style>