import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import app from './App';
import { db } from './database/initdb';

iconv.encodings = encodings;
require('dotenv').config();
const port = process.env.PORT || 8080 ;

if (process.env.NODE_ENV) {
  db.sync({ force: true }); // true: drops all tables first
} else {
  throw new Error('CONFIG ERROR : Please specify your NODE_ENV in an env file')
}

app.listen(port, () => console.log(`Server running on port ${port}`));