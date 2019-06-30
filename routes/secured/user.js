import { Router } from "express"; 
import User from "../../database/models/user";
import Vehicle from "../../database/models/vehicle";
import jwt from 'jsonwebtoken';

const api = Router();

// get user by id CHECKED
api.get("/:id", async (req, res) => {
	await User.findByPk(req.params.id)
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

api.put("/:id", async (req, res) => {
	console.log(req.headers.authorization)
	let bearerHeader =  req.headers.authorization
	bearerHeader.replace('Bearer ','');
	console.log(bearerHeader)
	jwt.verify(bearerHeader, process.env.SUPERSECRET, async (err,decoded) => {
		if (err) {
			console.log(decoded)
			res.status(501).json({ message: "error", error: { err} });
		} else {
			const { name, email, picture, FuelId, conso } = req.body;
			let vehicle = await Vehicle.findOne({ where: { FuelId, conso }});

			if (!vehicle) {
				try {
					const newvehicle = new Vehicle ({
						FuelId, 
						conso
					})
					await newvehicle.save();
					vehicle = newvehicle;
				} catch (error) {
					res.status(502).json({ message: "error", error: { err } });
				}
			}

			await User.update({ 
					name: req.body.name, 
					email: req.body.email, 
					picture: req.body.picture,
					password: req.body.password,
					password_confirmation: req.body.password_confirmation,
					VehicleId: vehicle.id
				}, {
					where: { id: req.param.id }, 
					returning: true, plain: true
				})
				.then((data) => {
					res.status(200).json({ message: "success", data: { data }});
				})
				.catch((err) => {
					res.status(503).json({ message: "error", error: { err }});
				})
		}
	});
})

api.delete("/:id", async (req, res) => {
	await User.update({
			state: "inactive"
		}, {
			where: { id: req.params.id },
			returning: true, plain: true
		})
		.then((data) => {
			res.status(200).json({ message: "succes", data: { data }});
		})
		.catch((err) => {
			res.status(500).json({ message: "error", error: { err }});
		})
})

export default api;
