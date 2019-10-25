<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <Login v-if="!logged" v-on:logged-in="logged=true" />
    <Editor v-else />
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
      logged: false
    };
  }
};
</script>