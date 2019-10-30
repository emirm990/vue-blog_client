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
        <div
          v-for="(blog,index) in filteredList"
          v-bind:key="blog._id"
          class="blog list-complete-item"
        >
          <Blog @commentpassed="comment" :blog="blog" :status="status" :index="index" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import BlogServiceFrontPage from "../BlogServiceFrontPage";
import Blog from "./Blog";
export default {
  name: "Blogs",
  components: {
    Blog
  },
  data() {
    return {
      blogs: [],
      error: "",
      text: "",
      searchValue: "",
      open: false,
      status: "",
      blog: {}
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
  methods: {
    async comment(id, name, text) {
      /* eslint-disable no-console */
      //console.log(id, name, text);
      if (name != "" && text != "") {
        try {
          this.blog = await BlogServiceFrontPage.comment(id, name, text);
          this.blogs = await BlogServiceFrontPage.getBlogs();
        } catch (err) {
          this.error = err.message;
        }
      } else {
        this.status = "Name or comment can't be empty!";
        setTimeout(() => {
          this.status = "";
        }, 1500);
      }
    }
  },
  async created() {
    try {
      this.blogs = await BlogServiceFrontPage.getBlogs();
      for (let i = 0; i < this.blogs.length; i++) {
        this.open[i] = false;
      }
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
@media only screen and (max-width: 768px) {
  .blog-container {
    margin: 0 10px 10px 10px;
  }
}
</style>
