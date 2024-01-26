import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

import totpRouter from './routes/totp.js';
import hotpRouter from './routes/hotp.js';

app.use('/totp', totpRouter);
app.use('/hotp', hotpRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});