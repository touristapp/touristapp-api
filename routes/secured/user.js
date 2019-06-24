import { Router } from "express";
import User from "../../database/models/user";

const api = Router();

api.get("/", async (req, res) => {
  // res.status(200).json({ users: { "message": "ok" } });
  console.log('================= user ')
  const users = await User.findAll();
  console.log(users)
  res.status(200).json({ data: { users } });
});

export default api;