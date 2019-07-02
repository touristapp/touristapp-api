import { Router } from 'express';
import Travel from '../../database/models/travel';
import Vehicle from '../../database/models/vehicle';

const api = Router();

api.get("/", async (req, res) => {
	await Travel.findAll()
		.then(data => {
			res.json({ message: "success", data: { data } });
		})
		.catch(err => {
			res.status(400).json({ error: err.message });
		});
});

// get travel by id
api.get("/:id", async (req, res) => {
	await Travel.findByPk(req.params.id)
		.then(data => {
			res.status(200);
			res.json({ message: "success", data: { data } });
		})
		.catch(err => {
			res.status(400);
			res.json({ err: err.message });
		});
});

api.post("/", async (req, res) => {
    const { departure, destination, carbonFootprint, distance, duration, VehicleId, UserId } = req.body;
    try {
        if ( departure == "" || destination == "" || carbonFootprint == "" || distance == "" || duration == "" || VehicleId == "" || UserId == "" ) {
            return res.status(400).json({ message: "error", error: "all fields need to be fill" })
        }
        if ( departure == null || destination == null || carbonFootprint == null || distance == null || duration == null || VehicleId == null || UserId == null ) {
            return res.status(400).json({ message: "error", error: "all fields are required" })
        }

        const vehicle = await Vehicle.findByPk(VehicleId)
        if ( vehicle == null ) {
            return res.status(400).json({ message: "error", error: "this vehicle don't exist" })
        }

        const travel = new Travel ({
            departure, 
            destination, 
            carbonFootprint, 
            distance, 
            duration, 
            VehicleId, 
            UserId
        });
        travel.save();
        res.status(201).json({ message: "success", data: { travel } });

    } catch (err) {
        res.status(400).json({ message: "error", error: err.message});
    }
})

//modify travel by id
api.put("/:id", async (req, res)=>{
    const { departure, destination, carbonFootprint, distance, duration, VehicleId } = req.body;
    await Travel.update({
        departure,
        destination,
        carbonFootprint,
        distance,
        duration,
        VehicleId
    }, {
        where: {id: req.params.id}, 
        returning: true, plain: true
    })
    .then(function(data) {
        res.status(200).json({ message: "success", data: data[1] });
    })
    .catch(function(error) {
        res.status(400).json({ message: "error",  error: error.message });
    });
});

api.put("/done/:id", async (req, res) => {
    await Travel.update({
        done: true
    }, {
        where: { id: req.params.id },
        returning: true, plain: true
    })
    .then((data) => {
        res.status(200).json({ message: "success", data: data[1] });
    })
    .catch((err) => {
        res.status(500).json({ message: "error", error: err.message });
    })
})

//delete travel by id
api.delete("/:id", async (req, res)=>{
    await Travel.destroy({where: { ID: req.params.id }
    })
    .then(data => {
        res.status(200);
        res.json(data.get({ plain: true }));
    })
    .catch(err => {
        res.status(400);
        res.json({ error: err.message });
    });
});

export default api;