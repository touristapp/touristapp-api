import { Router } from 'express';

const api = Router();

api.get("/auth", (req, res)=>{
    res.status(200).json({ auth: { "message": "ok" } });
});

export default api;