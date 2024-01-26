import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

import { verifyHotp } from '../utils/otp.js';


router.route('/')
    .post(async (req, res) => {
        const verified = verifyHotp(process.env.key, 1, 5, req.body.otp);
        return res.send(verified);
    })

export default router;