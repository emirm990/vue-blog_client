<template>
  <div class="blog-container">
    <div class="blog" v-for="blog in blogs" v-bind:key="blog._id">
      <h2>{{blog.title}}</h2>
      <p>{{`${blog.createdAt.getDate()}/${blog.createdAt.getMonth()}/${blog.createdAt.getFullYear()}`}}</p>
      <p>{{blog.text}}</p>
      <div v-for="comment in blog.comments" v-bind:key="comment.index">
        <p>{{comment.name}}</p>
        <p>{{comment.comment}}</p>
        <p>{{comment.date}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogService from "../BlogService";
export default {
  name: "Blogs",
  data() {
    return {
      blogs: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.blogs = await BlogService.getBlogs();
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.blog-container {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
