import { Router } from 'express';
import Fuel from '../../database/models/Fuel';

const api = Router();

api.get("/", async (req, res) => {
	await Fuel.findAll()
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

// get fuel by id
api.get("/:id", async (req, res) => {
	await Fuel.findByPk(req.params.id)
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

//delete fuel by id
api.delete("/:id", async (req, res)=>{
    await Fuel.destroy({where: { ID: req.params.id }
    })
    .then(data => {
        res.status(200);
        res.json(data.get({ plain: true }));
    })
    .catch(err => {
        res.status(500);
        res.json({ error: err.message });
    });
});

export default api;