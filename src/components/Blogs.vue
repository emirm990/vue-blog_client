<template>
  <div class="blog-container">
    <div class="blog" v-for="blog in blogs" v-bind:key="blog._id">
      <div class="blog-header">
        <h2 class="blog-title">{{blog.title}}</h2>
        <p
          class="blog-date"
        >{{`${blog.createdAt.getDate()}/${blog.createdAt.getMonth()}/${blog.createdAt.getFullYear()}`}}</p>
      </div>
      <div class="blog-body">
        <div class="blog-text editr--content" v-html="blog.text">{{blog.text}}</div>
      </div>
      <details v-if="blog.comments.length > 0">
        <summary>Number of comments: {{blog.comments.length}}</summary>
        <div class="blog-comment" v-for="comment in blog.comments" v-bind:key="comment.index">
          <p class="blog-comment-name">{{comment.name}}</p>
          <p class="blog-comment-comment">{{comment.comment}}</p>
          <!--<p class="blog-comment-date">{{comment.date}}</p>-->
        </div>
      </details>
    </div>
  </div>
</template>

<script>
import BlogServiceFrontPage from "../BlogServiceFrontPage";
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
      this.blogs = await BlogServiceFrontPage.getBlogs();
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
.blog {
  min-height: 100vh;
}
.blog-date {
  margin-top: 0;
}
.blog-title {
  margin-bottom: 0;
}
.blog-body {
  padding-left: 25px;
  padding-right: 25px;
}
.blog-text {
  text-align: left;
}
.blog-comment {
  margin-left: 10%;
  display: flex;
}
.blog-comment-name {
  margin-right: 20px;
  font-weight: bold;
}
</style>
