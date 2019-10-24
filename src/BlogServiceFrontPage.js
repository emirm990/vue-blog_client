import axios from 'axios';

const url = 'api/blogsFrontPage';

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
}
export default BlogServiceFrontPage;
