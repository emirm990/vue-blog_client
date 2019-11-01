<template>
  <div>
    <router-link to="/">Home</router-link>
    <div class="blog">
      <div class="blog-header">
        <h2 class="blog-title">{{blog.title}}</h2>
        <p
          v-if="loaded"
          class="blog-date"
        >{{`${new Date(blog.createdAt).getDate()}/${new Date(blog.createdAt).getMonth()}/${new Date(blog.createdAt).getFullYear()} - ${new Date(blog.createdAt).getHours()}:${new Date(blog.createdAt).getMinutes()}`}}</p>
      </div>
      <div class="blog-body">
        <div class="blog-text editr--content" v-html="blog.text">{{blog.text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import SingleBlog from "../SingleBlog";
export default {
  name: "BlogView",
  data() {
    return {
      blog: {},
      loaded: false,
      error: ""
    };
  },
  async created() {
    try {
      let response = await SingleBlog.getBlog(this.$route.params.id);
      this.blog = response.data;
      this.loaded = true;
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>
<style lang="scss" scoped>
.blog {
  margin: 0 auto;
  max-width: 1440px;
  margin-bottom: 20px;
  background: #d0d8d9;
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
.blog-comments {
  max-height: 0;
  overflow: hidden;
  padding: 0 20px 20px 20px;
  transition: max-height 0.2s ease-in-out;
}
.open-comments-button {
  margin-bottom: 10px;
  border: 1px solid white;
  padding: 10px 20px;
  background: white;
  transition: border-radius 0.2s ease-in-out, border-color 0.2s ease-in-out;
  outline: none;
  &:hover {
    border-radius: 4px;
    border-color: #9ca5a6;
  }
}
.opened {
  max-height: 1000px;
  transition: max-height 0.2s ease-in-out;
}
.blog-comment-info-container {
  flex-basis: 100%;
  text-align: left;
}
.blog-comment-date-container {
  flex-basis: 100%;
  text-align: left;
}
.blog-comment-date {
  margin-top: 0;
}
.blog-comment {
  margin-left: 10%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #9ca5a6;
}
.blog-comment-comment {
  display: inline-block;
}
.blog-comment-name {
  font-weight: bold;
  display: inline-block;
  margin-right: 20px;
}
.comment-input-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;

  input {
    padding: 10px 20px;
    border: 1px solid white;
    outline: none;
    margin-right: 5px;
    transition: border-radius 0.2s ease-in-out, border-color 0.2s ease-in-out;
    &:hover,
    &:focus {
      border-radius: 4px;
      border-color: #9ca5a6;
    }
  }
  button {
    border: 1px solid white;
    padding: 10px 20px;
    outline: none;
    background: white;
    transition: border-radius 0.2s ease-in-out, border-color 0.2s ease-in-out;
    &:hover {
      border-radius: 4px;
      border-color: #9ca5a6;
    }
  }
}
@media only screen and (max-width: 768px) {
  .blog-title {
    padding-top: 10px;
  }
  .comment-input-container {
    flex-wrap: wrap;
  }
}
@media only screen and (max-width: 768px) {
  .comment-input-container {
    justify-content: flex-end;
    input {
      margin: 2px 0;
      flex-basis: 100%;
    }
    button {
      margin: 2px 0;
      flex-basis: 50%;
    }
  }
}
</style>