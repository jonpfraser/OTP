import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

import { verifyTotp } from '../utils/otp.js';


router.route('/')
    .post(async (req, res) => {
        const verified = verifyTotp(process.env.key, 5, 30, req.body.otp);
        return res.send(verified);
    })

export default router;