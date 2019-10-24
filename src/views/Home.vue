<template>
  <div class="home">
    <Blogs />
  </div>
</template>

<script>
// @ is an alias to /src
import Blogs from "@/components/Blogs.vue";

export default {
  name: "home",
  components: {
    Blogs
  }
};
</script>