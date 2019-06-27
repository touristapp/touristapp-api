import { Router } from 'express';
import Travel from '../../database/models/travel';

const api = Router();

api.get("/", async (req, res) => {
	await Travel.findAll()
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

// get travel by id
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

api.post("/", async (req, res) => {
    const { deparature, destination, carbonFootprint, distance, duration, VehicleId, UserId } = req.body;
    try {
        const travel = new Travel ({
            deparature, 
            destination, 
            carbonFootprint, 
            distance, 
            duration, 
            VehicleId, 
            UserId
        });
        travel.save();
        res.status(201).json({ message: "success", data: { data } });

    } catch (err) {
        res.status(500).json({ message: "error", error: err.message});
    }
})

//modify travel by id
api.put("/:id", async (req, res)=>{
    const { deparature, destination, carbonFootprint, distance, duration, VehicleId } = req.body;
    await Travel.update({
        deparature,
        destination,
        carbonFootprint,
        distance,
        duration,
        VehicleId,
        updatedAt: updatedAt
    }, {
        where: {ID: req.params.id}, 
        returning: true, plain: true
    })
    .then(function(data) {
        res.status(200).json({ message: "success", data: data[1] });
    })
    .catch(function(error) {
        res.status(500).json({ message: "error",  error: error.message });
    });
});

//delete travel by id
api.delete("/:id", async (req, res)=>{
    await Travel.destroy({where: { ID: req.params.id }
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