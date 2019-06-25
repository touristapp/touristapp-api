import { Router } from "express";
import secured from "./secured";
import auth from "./auth";
import passport from 'passport';

const api = Router();

api.get("/", (req, res) => {
  res.status(200).json({
    name: "Touristapp API",
    meta: {
      version: "1.0.0",
      status: "in dev"
    }
  });
});

api.use("/auth", auth)
// api.use("/", secured);
api.use("/", passport.authenticate("jwt", { session: false }), secured);

export default api;