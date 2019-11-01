import axios from 'axios';

const url = 'api/blogsFrontPage';
const blogUrl = '../api/blogsFrontPage'
class BlogServiceFrontPage {
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
	static getBlog(id) {
		// eslint-disable-next-line no-console
		console.log(id);
		return axios.get(blogUrl, {
			params: {
				id
			}
		});

	}
	static comment(id, name, text) {
		return axios.get(url, {
			params: {
				id,
				name,
				text
			}
		});
	}
}
export default BlogServiceFrontPage;
