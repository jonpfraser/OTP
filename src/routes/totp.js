import express from 'express';
import dotenv from 'dotenv';
import { acceptedTotps, verifyTotp } from '../utils/totp.js';

const router = express.Router();
dotenv.config();


router.route('/')
    .get((req, res) => {
        const locals = {
            title: 'TOTP - Submission',
        }

        return res.render('totp/submit', locals)
    })
    .post(async (req, res) => {
        const locals = {
            title: 'TOTP - Submission',
            backLink: '/totp',
            verified: verifyTotp(process.env.key, 5, 30, req.body.totp)
        }

        return res.render('totp/verify', locals);
    });

router.route('/generate')
    .get((req, res) => {
        const locals = {
            title: 'TOTP - Generator',
            backLink: '/totp',
            codes: acceptedTotps(process.env.key, 5, 30)
        }
        return res.render('totp/generate', locals)
    });

export default router;