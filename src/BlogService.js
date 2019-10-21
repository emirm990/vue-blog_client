import axios from "axios";

const url = "http://localhost:5000/api/blogs";

class BlogService {
  // Get blogs
  static getBlogs() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;

        resolve(
          data.map(blog => ({
            ...blog,
            createdAt: new Date(blog.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  // Create Post
  static insertBlog(text) {
    return axios.post(url, {
      text
    });
  }
}
export default BlogService;
