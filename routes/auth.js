import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../database/models/user';

const api = Router();

api.post("/register", async (req, res)=>{
    // res.status(200).json({ auth: { "message": "ok" } });
    const { name, email, password, password_confirmation } = req.body;
    try {
        const user = new User({
            name,
            email,
            password,
            password_confirmation,
        });
        await user.save();
        const payload = { id: user.id, name, email };
        const token = jwt.sign(payload, process.env.SUPERSECRET);

        res.status(201).json({ data: { user }, meta: { token } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

api.post("/login", (req, res)=>{
    console.log("aaaaaaaaaa")
    // res.status(200).json({ auth: { "message": "ok" } });
    passport.authenticate("local", { session: false }, async (err, user) => {
        console.log("bbbb")
        if (err) {
            res.status(400).json({
                error: { message: err }
            });
        //   console.log("+++++++++++++++")
        //   return res.status(400);
        }
        console.log("iiiiiiiiiiiii")
        const { id, name, email } = user;
        const payload = { id, name, email };
        const token = jwt.sign(payload, process.env.SUPERSECRET);
        res.status(200).json({ data: { user }, meta: { token } });
    })(req, res);
});

export default api;