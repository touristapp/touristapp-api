import { Router } from 'express';
import user from './user';
import vehicle  from './vehicle';
import fuel from './fuel';
import travel from './travel';
import option from './option';

const api = Router();

api.use("/user", user);
api.use("/vehicle", vehicle);
api.use("/fuel", fuel);
api.use("/travel", travel);
api.use("/option", option);

export default api;