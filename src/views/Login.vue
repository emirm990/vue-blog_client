<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <button @click="createBlog">Submit</button>
  </div>
</template>
<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import BlogService from "../BlogService";
export default {
  name: "Editor",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      plugins: [SimpleUploadAdapter],
      editorConfig: {
        // The configuration of the editor.
      }
    };
  },
  methods: {
    async createBlog() {
      await BlogService.insertBlog(this.editorData);
    }
  }
};
</script>