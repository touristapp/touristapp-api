import { Router } from 'express';
import users from './user';
import vehicules  from './vehicule';
import fuel from './fuel';
import travel from './travel';
import option from './option';

const api = Router();

api.get("/users", users);
api.get("/vehicules", vehicules);
api.get("/fuel", fuel);
api.get("/travel", travel);
api.get("/option", option);

export default api;