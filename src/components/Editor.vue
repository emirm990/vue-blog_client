<template>
  <div class="containter">
    <div>
      <form class="about">
        <input type="text" placeholder="Blog title" required v-model="title" />
        <wysiwyg v-model="myHTML" />
        <input type="submit" @click.prevent="createBlog" value="Submit" />
        <button @click.prevent="updateBlog">Update</button>
      </form>
      <div>
        <p>{{status}}</p>
      </div>
      <div class="blog" v-for="blog in blogs" v-bind:key="blog._id">
        <div class="blog-header">
          <h2 class="blog-title">{{blog.title}}</h2>
          <p
            class="blog-date"
          >{{`${blog.createdAt.getDate()}/${blog.createdAt.getMonth()}/${blog.createdAt.getFullYear()}`}}</p>
          <button @click="deleteBlog(blog._id)">Delete blog</button>
          <button @click="editBlog(blog._id)">Edit blog</button>
        </div>
      </div>
    </div>
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
      status: ""
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
      const response = await BlogService.deleteBlog(id);
      this.blogs = await BlogService.getBlogs();
      this.status = response.data;
    },
    async editBlog(id) {
      try {
        this.blog = await BlogService.editBlog(id);
        this.blogData = this.blog.data;
        this.myHTML = this.blogData.text;
        this.title = this.blogData.title;
        this.id = this.blogData._id;
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
      } catch (err) {
        this.error = err.message;
      }
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
.about {
  text-align: left;
}
</style>