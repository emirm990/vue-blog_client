<template>
  <div class="about">
    <wysiwyg v-model="myHTML" />
    <button @click="createBlog">Submit</button>
  </div>
</template>

<script>
import BlogService from "../BlogService";

export default {
  name: "Editor",
  data() {
    return {
      myHTML: "",
      error: ""
    };
  },
  methods: {
    async createBlog() {
      try {
        await BlogService.insertBlog(this.myHTML);
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>
<style lang="scss">
.about {
  text-align: left;
}
</style>