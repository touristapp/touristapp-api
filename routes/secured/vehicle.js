import { Router } from 'express';
import Vehicle from '../../database/models/Vehicle';

const api = Router();

// get all vehicles CHECKED
api.get("/", async (req, res) => {
	await Vehicle.findAll()
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

// get vehicle by id CHECKED
api.get("/:id", async (req, res) => {
	await Vehicle.findByPk(req.params.id)
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

// post vehicle CHECKED
api.post("/", async (req, res) => {
    const { FuelId, conso} = req.body
    try {
        const vehicle = new Vehicle ({
            FuelId,
            conso
        })
        await vehicle.save();
        res.status(201).json({ message: "success", data: { vehicle } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// modify vehicle by id CHECKED
api.put("/:id", async (req, res)=>{
    const { FuelId, conso } = req.body
    await Vehicle.update({
            conso,
            FuelId
        }, { 
            where: { id: req.params.id }, 
            returning: true, plain: true 
        })
        .then((data) => {
            res.status(200).json({ message: "success", data: data[1] })
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// delete vehicle by id CHECKED
api.delete("/:id", async (req, res)=>{
    await Vehicle.destroy({
            where: { id: req.params.id}
        })
        .then(data => {
            res.status(200).json({ message: "success" });
        })
        .catch(err => {
            res.status(500).json({ err: err.message });
        });
});

export default api;