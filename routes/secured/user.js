import { Router } from "express"; 
import User from "../../database/models/user";
import Vehicle from "../../database/models/vehicle";

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
	const { name, email, picture, FuelId, conso } = req.body;

	let vehicle = await Vehicle.findOne({ where: { FuelId, conso }});
	console.log("________________________________ vehicle");
	console.log(vehicle);
	if (!vehicle) {
		const newvehicle = new Vehicle ({
			FuelId, 
			conso
		})
		console.log('================================ newvehicle');
		console.log(newvehicle);
		await newvehicle.save();
		vehicle = newvehicle;
	}

	await User.update({ 
			name, 
			email, 
			picture,
			VehicleId: vehicle.id
		}, {
			where: { id: req.param.id }, 
			returning: true, plain: true
		})
		.then((data) => {
			res.status(200).json({ message: "success", data: { data }});
		})
		.catch((err) => {
			res.status(500).json({ message: "error", error: { err }});
		})
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
