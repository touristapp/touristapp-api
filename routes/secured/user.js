import { Router } from "express";
// import User from "../../database/models/user";

const api = Router();

console.log('users')
api.get("/users", async (req, res) => {
  res.status(200).json({ data: { "message": "ok" } });
});

export default api;