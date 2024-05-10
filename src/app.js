import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import { JSONFilePreset } from 'lowdb/node'

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const defaultData = { key: process.env.key, count: 1 }
export const db = await JSONFilePreset('db.json', defaultData)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

import totpRouter from './routes/totp.js';
import hotpRouter from './routes/hotp.js';

app.use('/totp', totpRouter);
app.use('/hotp', hotpRouter);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});