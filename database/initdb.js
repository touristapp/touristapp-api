import { Sequelize, Op } from 'sequelize';
import fs from 'fs';
import User from './models/user';
import Travel from './models/travel';
import Option from './models/Option';
import Vehicule from './models/Vehicule';
import Fuel from './models/Fuel';


const config = fs.existsSync(__dirname.replace('\\','/')+'/config.json') ? require('./config.json').dev : null;
export const db = (config) ? new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        dialect: config.dialect,
        port: config.port,
        logging: console.log,
        define: {
            timestamps: false
        }
    }) : new Sequelize(process.env.URI, {logging: false});

db.authenticate()
    .then( (err)=> {console.log('Connection has been establihed successfully.');
}) 
    .catch( (err) => { console.log('Connection to the database has failed.');
});

User.init(db);
Travel.init(db);
Vehicule.init(db);
Fuel.init(db);
Option.init(db);

User.belongsTo(Vehicule);
Vehicule.hasMany(User);

Vehicule.belongsTo(Fuel);
Fuel.hasMany(Vehicule);

Travel.belongsToMany(User);
User.hasMany(Travel);

Option.belongsToMany(Travel, {as: 'optionToTravel', through: 'Travel_Option', foreignKey: 'id_option'});
Travel.belongsToMany(Option, {as: 'travelToOption', through: 'Travel_Option', foreignKey: 'id_travel'});
