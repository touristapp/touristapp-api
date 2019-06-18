import { Sequelize } from 'sequelize';
import fs from 'fs';

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