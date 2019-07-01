import { Router } from 'express';
import user from './user';
import vehicle  from './vehicle';
import fuel from './fuel';
import travel from './travel';
import option from './option';
import admin from './admin';
import image from  "./image"

const api = Router();

api.use("/user", user);
api.use("/vehicle", vehicle);
api.use("/fuel", fuel);
api.use("/travel", travel);
api.use("/option", option);
api.use("/admin", admin);
api.use("/image", image)

export default api;