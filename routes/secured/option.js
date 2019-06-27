import { Router } from 'express';
import Option from '../../database/models/option';


const api = Router();

api.get("/", async (req, res) => {
	await Option.findAll()
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

// get option by id
api.get("/:id", async (req, res) => {
	await Option.findByPk(req.params.id)
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
	const { name } = req.body;
	try {
		const option = new Option({
			name
		});
		option.save()
		res.status(201).json({ message: "success", data: { data } });
	} catch (err) {
		res.status(500).json({ message: "error", error: err.message });
	}
})

// delete option by id
api.delete("/:id", async (req, res)=>{
    Option.destroy({ 
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