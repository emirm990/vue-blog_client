<template>
  <div class="container">
    <form>
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" autocomplete />
      <input type="submit" @click.prevent="login(username, password)" />
    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      logged: false
    };
  },
  methods: {
    login(username, password) {
      if (username != "test" || password != "test") {
        this.logged = false;
        this.$emit("error");
      } else {
        this.logged = true;
        this.$emit("logged-in");
      }
    }
  }
};
</script>