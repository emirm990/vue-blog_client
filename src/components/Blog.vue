<template>
  <div>
    <div class="blog-header">
      <router-link :to="{path:'/blog/', query:{id: blog._id}}">
        <h2 class="blog-title">{{blog.title}}</h2>
      </router-link>
      <p
        class="blog-date"
      >{{`${blog.createdAt.getDate()}/${blog.createdAt.getMonth()}/${blog.createdAt.getFullYear()}`}}</p>
    </div>
    <div class="blog-body">
      <div class="blog-text editr--content" v-html="blog.text">{{blog.text}}</div>
    </div>
    <button class="open-comments-button" @click="handleOpen">Comments {{blog.comments.length}}</button>
    <div class="blog-comments" v-bind:class="{opened: open}">
      <div v-if="blog.comments.length > 0">
        <div class="blog-comment" v-for="(comment, index) in blog.comments" v-bind:key="index">
          <div class="blog-comment-info-container">
            <p class="blog-comment-name">{{comment.name}}</p>
            <p class="blog-comment-comment">{{comment.comment}}</p>
          </div>
          <div class="blog-comment-date-container">
            <p
              class="blog-comment-date"
            >{{`${new Date(comment.date).getDate()}/${new Date(comment.date).getMonth()}/${new Date(comment.date).getFullYear()} - ${new Date(comment.date).getHours()}:${new Date(comment.date).getMinutes()}`}}</p>
          </div>
        </div>
      </div>
      <div class="comment-input-container">
        <p v-if="status">{{status}}</p>
        <input type="text" v-model="commentName" placeholder="Name" />
        <input type="text" v-model="commentText" placeholder="comment" />
        <button @click="commentEmit(blog._id,commentName, commentText)">Comment</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Blog",
  props: {
    blog: {},
    index: Number,
    status: String
  },
  data() {
    return {
      open: false,
      commentText: "",
      commentName: ""
    };
  },
  methods: {
    handleOpen() {
      this.open = !this.open;
    },
    commentEmit(id, name, text) {
      this.$emit("commentpassed", id, name, text);
      this.commentText = "";
      this.commentName = "";
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #1a1a26;
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
  padding-top: 10px;
}
.blog-body {
  padding-left: 25px;
  padding-right: 25px;
}
.blog-text {
  text-align: left;
  max-height: 500px;
  overflow: hidden;
}
.blog-comments {
  max-height: 0;
  overflow: hidden;
  padding: 0 20px 20px 20px;
  transition: max-height 0.2s ease-in-out;
}
.open-comments-button {
  margin-bottom: 10px;
  margin-top: 10px;
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
  max-height: 10000px;
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