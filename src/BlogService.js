import axios from 'axios';

const url = 'api/blogs';

class BlogService {
	// Get blogs
	static getBlogs() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.get(url);
				const data = res.data;

				resolve(
					data.map((blog) => ({
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
	static insertBlog(title, text) {
		return axios.post(url, {
			title,
			text
		});
	}
	// Delete Post
	static deleteBlog(id) {
		return axios.delete(url, {
			data: {
				id
			}
		});
	}

	static editBlog(id) {
		return axios.get(url, {
			params: {
				id
			}
		});
	}

	static updateBlog(id, title, text) {
		return axios.post(url, {
			id,
			title,
			text
		});
	}
}
export default BlogService;
