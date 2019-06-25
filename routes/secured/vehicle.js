import { Router } from 'express';
import Vehicle from '../../database/models/Vehicle';

const api = Router();

api.get("/", async (req, res) => {
	await Vehicle.findAll()
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

// get vehicle by id
api.get("/:id", async (req, res) => {
	await Vehicle.findByPk(req.params.id)
		.then(data => {
			res.status(200);
			res.json({
				data
			});
		})
		.catch(err => {
            console.log(err);
            
			res.status(500);
			res.json({
				err: err.message
			});
		});
});

// modify vehicle by id
api.put("/:id", async (req, res)=>{
    await Vehicle.update({
        conso: req.body.conso,
        updatedAt: updatedAt
    }, { where: { ID: req.body.id }, returning: true, plain: true }
    )

    .then(function(data) {
        res.status(200);
        res.json(data.get({ plain: true }));
    })
    .catch(function(error) {
        res.status(500);
        res.json({ error: error.message });
    });
});

// delete vehicle by id
api.delete("/:id", async (req, res)=>{
    await Vehicle.destroy({
        where: { ID: req.params.id}
    })
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