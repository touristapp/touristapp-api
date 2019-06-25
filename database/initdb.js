import { Sequelize, Op } from 'sequelize';
import fs from 'fs';
import User from './models/user';
import Travel from './models/travel';
import Option from './models/option';
import Vehicle from './models/vehicle';
import Fuel from './models/fuel';
require('dotenv').config();

const config = fs.existsSync(__dirname.replace('database','config')+'/config.json') ? require('../config/config.json').dev : null;

// export const db = (config) ? new Sequelize(
//     config.database,
//     config.user,
//     config.password,
//     {
//         dialect: config.dialect,
//         port: config.port,
//         logging: console.log,
//         define: {
//             timestamps: false
//         }
//     }) : new Sequelize(process.env.URI, {logging: false});

export const db = new Sequelize(process.env.URI);

db.authenticate()
    .then( (err)=> {console.log('Connection has been establihed successfully.');
}) 
    .catch( (err) => { console.log('Connection to the database has failed. \n', err);
});

User.init(db);
Travel.init(db);
Vehicle.init(db);
Fuel.init(db);
Option.init(db);

User.belongsTo(Vehicle);
Vehicle.hasMany(User, {
    allowNull: true
});

Vehicle.belongsTo(Fuel);
Fuel.hasMany(Vehicle);

Travel.belongsTo(User);
User.hasMany(Travel);

Travel.belongsTo(Vehicle);
Vehicle.hasMany(Travel);

Option.belongsToMany(Travel, {as: 'optionToTravel', through: 'Travel_Option', foreignKey: 'id_option'});
Travel.belongsToMany(Option, {as: 'travelToOption', through: 'Travel_Option', foreignKey: 'id_travel'});

