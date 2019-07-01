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

api.get("/vehicle/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id)
		const vehicle = await Vehicle.findByPk(user.VehicleId)

		res.status(200).json({ message: "success", data: vehicle })
	} catch (err) {
		res.status(501).json({ message: "error", error: { err } })
	}
});

api.put("/:id", async (req, res) => {
	let bearerHeader = req.headers.authorization.replace('Bearer ','')
	jwt.verify(bearerHeader, process.env.SUPERSECRET, async (err,decoded) => {
		if (err) {
			res.status(501).json({ message: "error", error: { err} });
		} else {
			const { name, email } = req.body;

			await User.update({ 
					name,
					email,
					password: "fake_password",
					password_confirmation: "fake_password",
				}, {
					where: { id: req.params.id }, 
					returning: true, plain: true
				})
				.then((data) => {
					const payload = { id: data.id, name: data.name, email: data.email };
					const token = jwt.sign(payload, process.env.SUPERSECRET);
					res.status(200).json({ message: "success", data: data[1] , meta: token});
				})
				.catch((err) => {
					console.log(err)
					res.status(503).json({ message: "error", error: { err }});
				})
		}
	});
})

api.put("/vehicle/:id", async (req, res) => {
	let bearerHeader = req.headers.authorization.replace('Bearer ','')
	jwt.verify(bearerHeader, process.env.SUPERSECRET, async (err,decoded) => {
		if (err) {
			res.status(501).json({ message: "error", error: { err} });
		} else {
			const { conso, FuelId } = req.body;

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
					VehicleId: vehicle.id,
					password: "fake_password",
					password_confirmation: "fake_password",
				}, {
					where: { id: req.params.id }, 
					returning: true, plain: true
				})
				.then((data) => {
					const payload = { id: data.id, name: data.name, email: data.email };
					const token = jwt.sign(payload, process.env.SUPERSECRET);
					res.status(200).json({ message: "success", data: data[1] , meta: token});
				})
				.catch((err) => {
					console.log(err)
					res.status(503).json({ message: "error", error: { err }});
				})
		}
	});
})

api.put("/updatepassword/:id", async (req, res) => {
	let bearerHeader = req.headers.authorization.replace('Bearer ','')
	jwt.verify(bearerHeader, process.env.SUPERSECRET, async (err,decoded) => {
		if (err) {
			res.status(501).json({ message: "error", error: { err} });
		} else {
			const { password, password_confirmation, current_password } = req.body;
			const old_user = await User.findByPk(req.params.id);
			if ((await old_user.checkPassword(current_password))) {
				await old_user.update({ 
						password,
						password_confirmation,
					}, {
						returning: true, plain: true
					})
					.then((data) => {
						res.status(200).json({ message: "success", data: data[1]});
					})
					.catch((err) => {
						console.log(err)
						res.status(503).json({ message: "error", error: { err }});
					})
			} else {
				res.status(400).json({ message: "error", error: "Old password is incorrect." })
			}
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
