import { Router } from 'express';
import Vehicle from '../../database/models/vehicle';
import Fuel from '../../database/models/fuel';

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

api.get("/fuel/:id", async (req, res) => {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        const fuel = await Fuel.findByPk(vehicle.FuelId);
        res.status(200).json({ message: "success", data: fuel });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "error", error: err.message });
    }
})

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
    const { name, FuelId, conso } = req.body
    try {
        const vehicle = new Vehicle ({
            name,
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
    const { name, FuelId, conso } = req.body
    await Vehicle.update({
            name,
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
