<template>
  <div class="container">
    <form>
      <div class="form-group">
        <input name="username" type="text" v-model="username" />
        <label for="username" v-bind:class="{typing: username}">username</label>
      </div>
      <div class="form-group">
        <input name="password" type="password" v-model="password" autocomplete />
        <label for="password" v-bind:class="{typing: password}">password</label>
        <span class="view-password" @click="showPassword">
          <font-awesome-icon v-if="!show" icon="eye" />
          <font-awesome-icon v-else icon="eye-slash" />
        </span>
        <div class="view-password-data" v-if="show && password">{{password}}</div>
      </div>
      <div class="form-group">
        <input type="submit" @click.prevent="login(username, password)" value="Login" autofocus />
      </div>
      <div class="error-container" v-if="error!=''">
        <p class="error">{{error}}</p>
      </div>
    </form>
  </div>
</template>
<script>
import BlogService from "../BlogService";
export default {
  name: "Login",

  data() {
    return {
      username: "",
      password: "",
      logged: false,
      error: "",
      show: false,
      status: ""
    };
  },
  methods: {
    /*login(username, password) {
      if (username != "test" || password != "test") {
        this.logged = false;
        this.error = "Wrong username or password";
      } else {
        this.logged = true;
        this.error = "";
        this.$emit("logged-in");
      }
    },*/
    async login(username, password) {
      try {
        const response = await BlogService.login(username, password);
        this.status = response.data;
        if (this.status == "logged") {
          this.logged = true;
          this.$emit("logged-in");
        }
      } catch (err) {
        this.error = err.message;
      }
    },
    showPassword() {
      this.show = !this.show;
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  background-color: #d0d8d9 !important;
  border: 1px solid #9ca5a6;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
  margin-right: 5px;
}
.container form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  position: relative;
}
.error-container {
  position: absolute;
  top: 60%;
}
.view-password {
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(50%);
  cursor: pointer;
}
.view-password-data {
  position: absolute;
  /* top: -48px; */
  top: 0;
  right: 0;
  transform: translateX(1%) translateY(-130%);
  background: #d0d8d9;
  padding: 10px;
  border-radius: 2px;
  &:after {
    content: " ";
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    bottom: -5px;
    background: #d0d8d9;
    right: 15px;
    transform: rotate(45deg);
  }
}
.error {
  color: red;
}
.typing {
  transform: translateY(-200%) translateX(10%);
  font-size: 150%;
  text-shadow: 10px 10px 5px black;
}
.form-group {
  position: relative;
  label {
    position: absolute;
    left: 10px;
    top: 10px;
    transition: all 0.2s ease-in-out;
    pointer-events: none;
  }
  input {
    outline: none;
    &:hover,
    &:focus {
      border-radius: 5px;
      box-shadow: 0px 0px 5px #1a1a26;
      + label {
        transform: translateY(-200%) translateX(10%);
        font-size: 150%;
        text-shadow: 10px 10px 5px black;
      }
    }
  }
}
</style>