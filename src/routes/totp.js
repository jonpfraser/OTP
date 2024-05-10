import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

import {acceptedTotps, verifyTotp} from '../utils/totp.js';

router.route('/')
    .get((req, res) => {
        return res.render('totp/submit')
    })
    .post(async (req, res) => {
        const locals = {
            title: 'TOTP - Submission',
            verified: verifyTotp(process.env.key, 5, 30, req.body.totp)
        }

        return res.render('totp/verify', locals);
    });

router.route('/generate')
    .get((req, res) => {
        const locals = {
            title: 'TOTP - Generator',
            codes: acceptedTotps(process.env.key, 5, 30)
        }
        return res.render('totp/generate', locals)
    });

export default router;