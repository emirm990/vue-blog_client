<template>
  <div id="app">
    <header>
      <h1>Simple vue.js + express.js blog</h1>
    </header>
    <router-view />
  </div>
</template>
<style lang="scss">
@import "~vue-wysiwyg/dist/vueWysiwyg";
* {
  box-sizing: border-box;
}
#app {
  font-family: "Cabin", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1a1a26;
}
body {
  margin: 0;
  background: #9ca5a6;
}
header {
  padding: 2rem;
  background: #d0d8d9;
  margin-bottom: 3rem;
}
.blog {
  background: #d0d8d9;
}
.container {
  max-width: 1080px;
  margin: 0 auto;
}
.router-link-active {
  position: relative;
  top: -25px;
  color: black;
  &:hover {
    color: white;
  }
}
</style>
