import { Router } from 'express';
import Travel from '../../database/models/travel';

const api = Router();

api.get("/", async (req, res) => {
	await Travel.findAll()
		.then(data => {
			console.log(data);
			res.json({
				data
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err.message
			});
		});
});

// get user by id
api.get("/:id", async (req, res) => {
	await Travel.findByPk(req.params.id)
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