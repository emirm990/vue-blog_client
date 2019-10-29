<template>
  <div>
    <div class="search-section">
      <div class="search-container">
        <input class="search" name="search" type="text" v-model="searchValue" />
        <label for="name">Search</label>
      </div>
    </div>
    <div class="blog-container">
      <transition-group name="list-complete">
        <div class="blog list-complete-item" v-for="blog in filteredList" v-bind:key="blog._id">
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
      </transition-group>
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
      text: "",
      searchValue: ""
    };
  },
  computed: {
    filteredList() {
      return this.blogs.filter(blog => {
        return blog.title
          .toLowerCase()
          .includes(this.searchValue.toLowerCase());
      });
    }
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
.editr--content {
  background: transparent;
}
* {
  box-sizing: border-box;
}
.list-complete-item {
  transition: all 0.2s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%);
}
.list-complete-leave-active {
  position: absolute;
}
.search-section {
  margin-bottom: 3rem;
}
.search {
  padding: 20px 50px;
  border-radius: 4px;
  border: 1px solid #9ca5a6;
  outline: none;
  transition: border 0.2s ease-in-out;
  &:focus {
    border: 1px solid #d0d8d9;
    + label {
      transform: translateX(50%) translateY(-4rem);
      font-size: 150%;
      text-shadow: 0px 10px 5px black;
    }
  }
}
.search-container {
  display: inline-block;
  position: relative;
  label {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateX(50%) translateY(-50%);
    transition: transform 0.2s ease-in-out, font-size 0.2s ease-in-out,
      text-shadow 0.2s ease-in-out;
  }
}
.blog-container {
  max-width: 1080px;
  margin: 0 auto;
}
.blog {
  padding: 20px;
  margin-bottom: 20px;
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
