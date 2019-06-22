import { Router } from 'express';

const api = Router();

api.get("/vehicules", (req, res)=>{
    res.status(200).json({ data: { "message": "ok" } });
});

export default api;