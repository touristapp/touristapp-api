import { Router } from 'express';
import Fuel from '../../database/models/fuel';

const api = Router();

// get all fuel type --> CHECKED
api.get("/", async (req, res) => {
	await Fuel.findAll()
		.then(data => {
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

// get fuel by id --> CHECKED
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

// ad a fuel type --> CHECKED
api.post("/", async(req, res) => {
	const { name, carbonFootprint } = req.body;
	try {
		const newFuel = await new Fuel({ name, carbonFootprint })
		await newFuel.save();
		res.status(201).json({ data: { newFuel }});
	}
	catch(err){
		res.status(500).json({ err: err.message });
	}
})


//delete fuel by id --> CHECKED
api.delete("/:id", async (req, res)=>{
	const { id } = req.params;
	if (isNaN(id)){
		res.status(404).send(`ERROR: ID must be a number`)
	}
	else {
		const fuelToDelete = await Fuel.findByPk(id);
		if (fuelToDelete != null || isNaN(id)){
			await fuelToDelete.destroy()
			.then(() => {
				res.status(200).json(`SUCCESS: Fuel with ID ${id} deleted`);
			})
			.catch(err => {
				res.status(500);
				res.json({ error: err.message });
			});
		}
		else res.status(404).send(`ERROR: Fuel with ID ${id} cannot be found`)
	}
});

export default api;
