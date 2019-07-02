import { Router } from "express"; 
import User from "../../database/models/user";
import Vehicle from "../../database/models/vehicle";
import jwt from 'jsonwebtoken';
import { uploadImg, deleteImg } from '../../services/handleS3';

const imageUpload = uploadImg.single('image');
const api = Router();

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
		res.status(501).json({ message: "error", error: err.stack  })
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
					res.status(503).json({ message: "error", error: err.stack });
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
					res.status(502).json({ message: "error", error: err.stack  });
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
					res.status(503).json({ message: "error", error: err.stack });
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
						res.status(503).json({ message: "error", error: err.stack });
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
			res.status(500).json({ message: "error", error: err.stack });
		})
})

// HANDLE USER IMAGE
api.post('/addImage/:id', (req, res) => {
    imageUpload(req, res, async (err) => {
		if (err) {
			return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
		}
		await User.update({ 
			picture: "req.file.location",
			password: "fake_password",
			password_confirmation: "fake_password",
		}, {
			where: { id: req.params.id }, 
			returning: true, plain: true
		})
		.then(() => {
			res.status(200).json({ message: "success", imageUrl: req.file.location });
		})
		.catch((err) => {
			res.status(503).json({ message: "error", error: err.stack });
		})
	});
});

api.delete('/deleteImage/:fileKey', (req, res) => {
  try {
    deleteImg(req.params.fileKey);
    return res.status(200).json({message: "Success - Image deleted from S3 or not existing"})
  }
  catch (err) {
    return res.status(500).json({ message: "error", error: err.stack});
  }
})

export default api;
