<template  >
  <div>
    <form class="about">
      <input class="title" type="text" placeholder="Blog title" required v-model="title" />
      <div>
        <wysiwyg v-model="myHTML" />
      </div>
      <transition-group name="list-complete">
        <input
          v-bind:key="1"
          class="button button-background list-complete-item"
          type="submit"
          @click.prevent="createBlog"
          value="Submit"
          v-if="!editing"
        />
        <input
          v-bind:key="2"
          class="button button-background list-complete-item"
          type="button"
          @click.prevent="updateBlog"
          value="Update"
          v-if="editing"
        />
        <input
          v-bind:key="3"
          class="button button-background list-complete-item"
          type="button"
          @click.prevent="cancelUpdate"
          value="Cancel"
          v-if="editing"
        />
      </transition-group>
    </form>
    <div>
      <p>{{status}}</p>
    </div>
    <transition-group name="list-complete" tag="div">
      <div class="blog list-complete-item" v-for="blog in blogs" v-bind:key="blog._id">
        <div class="blog-header">
          <h2 class="blog-title">{{blog.title}}</h2>
          <p
            class="blog-date"
          >{{`${blog.createdAt.getDate()}/${blog.createdAt.getMonth()}/${blog.createdAt.getFullYear()}`}}</p>
          <button class="button" @click="editBlog(blog._id)">Edit blog</button>
          <button class="button" @click="deleteBlog(blog._id)">Delete blog</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>
  
<script>
import BlogService from "../BlogService";

export default {
  name: "Editor",
  data() {
    return {
      blogs: [],
      myHTML: "",
      title: "",
      error: "",
      blog: "",
      blogData: "",
      id: "",
      status: "",
      editing: false
    };
  },
  methods: {
    async createBlog() {
      try {
        const response = await BlogService.insertBlog(this.title, this.myHTML);
        this.blogs = await BlogService.getBlogs();
        this.myHTML = "";
        this.title = "";
        this.status = response.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteBlog(id) {
      if (confirm("Are you sure you want to delete this blog?")) {
        const response = await BlogService.deleteBlog(id);
        this.blogs = await BlogService.getBlogs();
        this.status = response.data;
      }
    },
    async editBlog(id) {
      try {
        this.blog = await BlogService.editBlog(id);
        this.blogData = this.blog.data;
        this.myHTML = this.blogData.text;
        this.title = this.blogData.title;
        this.id = this.blogData._id;
        this.editing = true;
      } catch (err) {
        this.error = err.message;
      }
    },
    async updateBlog() {
      try {
        const response = await BlogService.updateBlog(
          this.id,
          this.title,
          this.myHTML
        );
        this.blogs = await BlogService.getBlogs();
        this.status = response.data;
        this.editing = false;
        this.title = "";
        this.myHTML = "";
      } catch (err) {
        this.error = err.message;
      }
    },
    cancelUpdate() {
      this.id = "";
      this.title = "";
      this.myHTML = "";
      this.editing = false;
    }
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
<style lang="scss">
.editr--content {
  background: white;
}
@media only screen and (max-width: 425px) {
  .editr--toolbar {
    flex-wrap: wrap;
    justify-content: center;
    height: auto;
  }
  .list-complete-item {
    display: block;
    margin-right: 0;
  }
}
</style>
<style lang="scss" scoped>
.about {
  text-align: left;
}
.editr {
  border: none;
  &:focus {
    box-shadow: 0 0 5px black;
  }
}

.focused {
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  overflow: hidden;
}
.title {
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 2rem;
  outline: none;
  border: none;
  transition: border-radius 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  &:focus {
    border-radius: 5px;
    box-shadow: 0 0 5px black;
  }
}
.blog {
  padding: 10px;
  margin-bottom: 5px;
}
.blog-title {
  margin-bottom: 0.5rem;
}
.blog-date {
  margin-top: 0;
}
.button {
  padding: 10px;
  margin-top: 5px;
  margin-right: 5px;
  min-width: 100px;
  background: #9ca5a6;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-radius: 5px;
    box-shadow: 0 0 5px black;
  }
}
.button-background {
  background: #d0d8d9;
}
.list-complete-item {
  transition: all 0.2s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(50px);
}
.list-complete-leave-active {
  position: absolute;
}
@media only screen and (max-width: 425px) {
  .list-complete-item {
    display: block;
  }
  .about {
    margin-left: 10px;
    margin-right: 10px;
  }
  .blog {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>