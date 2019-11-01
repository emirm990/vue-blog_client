import axios from "axios";

const blogUrl = "../api/blog";

class SingleBlog {
  static getBlog(id) {
    // eslint-disable-next-line no-console
    console.log(id);
    return axios.get(blogUrl, {
      params: {
        id
      }
    });
  }
}
export default SingleBlog;
