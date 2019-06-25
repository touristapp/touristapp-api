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

//modify travel by id
api.put("/:id", async (req, res)=>{
    await Travel.update({
        deparature: req.body.deparature,
        destination: req.body.destination,
        carbonFootprint: req.body.carbonFootprint,
        distance: req.body.distance,
        duration: req.body.duration,
        updatedAt: updatedAt
    }, {where: {ID: req.body.id}, returning: true, plain: true})
    
    .then(function(data) {
        res.status(200);
        res.json(data.get({ plain: true }));
    })
    .catch(function(error) {
        res.status(500);
        res.json({ error: error.message });
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