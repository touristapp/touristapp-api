import { Router } from "express";
import User from "../../database/models/user";
import Vehicle from "../../database/models/vehicle";
import jwt from 'jsonwebtoken';
import Travel from "../../database/models/travel";
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
		res.status(400).json({ message: "error", error: { err } })
	}
});

// api.get("/travel/:id", async (req, res) => {
// 	try {
// 		const travels = await Travel.findAll({ where: { UserId: req.params.id }});

// 		res.status(200).json({ message: "success", data: travels});
// 	} catch (err) {
// 		res.status(400).json({message: "error", error: { err }})
// 	}
// })

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
			const { vehicleId, name, conso, FuelId } = req.body;

			let vehicle = Vehicle.findOne({ where: { id: vehicleId }}).then( async vehicle => {
				if (!vehicle) {
					try {
						const newvehicle = new Vehicle ({
							name,
							FuelId,
							conso
						})
						await newvehicle.save();

						await User.update({
							VehicleId: newvehicle.id,
							password: "fake_password",
							password_confirmation: "fake_password",
						}, {
							where: { id: req.params.id },
							returning: true, plain: true
						})
						.then( (data) => {
							const payload = { id: data.id, name: data.name, email: data.email };
							const token = jwt.sign(payload, process.env.SUPERSECRET);
							res.status(200).json({ message: "success", data: data[1], meta: bearerHeader });
						})
						.catch((err) => {
							console.log(err)
							res.status(503).json({ message: "error", error: err.stack });
						})
					} catch (error) {
						res.status(502).json({ message: "error", error: err.stack  });
					}
				} else {
					await Vehicle.update({
						name: name,
						conso: conso,
						FuelId: FuelId
					}, {
						where: { id: vehicleId },
						returning: true, plain: true
					}).then( updated => {
						res.status(200).json({ message: "success", data: updated[1] , meta: bearerHeader});
					})
				}
			});
		}
	});
})

api.put("/updatepassword/:id", async (req, res) => {
	let token = req.headers.authorization.replace('Bearer ','')
	jwt.verify(token, process.env.SUPERSECRET, async (err,decoded) => {
		if (err) {
			res.status(401).json({ message: "Token error", error: { err} });
		} else {
			const { password, password_confirmation, old_password } = req.body;
			const old_user = await User.findByPk(req.params.id);
			if ((await old_user.checkPassword(old_password))) {
				await old_user.update({
						password,
						password_confirmation,
					}, {
						returning: true, plain: true
					})
					.then((data) => {
						res.status(200).json({ message: "success" });
					})
					.catch((err) => {
						console.log(err.message)
						res.status(503).json({ message: "error", error: err.message });
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

api.post('/addImage/:id', (req, res) => {
    imageUpload(req, res, async (err) => {
		if (err) {
			console.log("ERROR in image uploading: ", err.message);
			return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
		}
		await User.update({
			picture: req.file.location,
			password: "fake_password",
			password_confirmation: "fake_password",
		}, {
			where: { id: req.params.id },
			returning: true, plain: true
		})
		.then(() => {
			console.log("SUCCESS in updating user with image");
			res.status(200).json({ message: "success", imageUrl: req.file.location });
		})
		.catch((err) => {
			console.log("ERROR in updating user with image: ", err.stack);
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
