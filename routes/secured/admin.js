import { Router } from "express"; 
import User from "../../database/models/user";

const api = Router();

api.get("/users", async (req, res) => {
	console.log('======== findAll')
	console.log(User)
	const result = await User.findAll()
		// .then(data => {
		// 	res.json({
		// 		data
		// 	});
		// })
		// .catch(err => {
		// 	res.status(500).json({
		// 		error: err.message
		// 	});
		// });
		res.json({result})
});

// get user by id
api.get("/user", async (req, res) => {
  const { email } = req.body
	await User.findOne({ where: { email } })
		.then(data => {
			res.status(200);
			res.json({
				data
			});
		})
		.catch(err => {
			res.status(500);
			res.json({
				err: err.message
			});
		});
});

export default api;