<template>
  <div class="container">
    <Login v-if="!logged" v-on:logged-in="logged=true" v-on:error="handleError" />
    <Editor v-else />
    <p v-if="error!=''">{{error}}</p>
  </div>
</template>
<script>
import Editor from "../components/Editor";
import Login from "../components/Login";
export default {
  name: "LoginView",
  components: {
    Editor,
    Login
  },
  data() {
    return {
      logged: false,
      error: ""
    };
  },
  methods: {
    handleError() {
      this.error = "Wrong username or password";
      setTimeout(() => {
        this.error = "";
      }, 2500);
    }
  }
};
</script>