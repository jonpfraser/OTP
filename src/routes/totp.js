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
            verified: verifyTotp(process.env.key, 5, 30, req.body.totp)
        }

        return res.render('totp/verify', locals);
    });

router.route('/generate')
    .get((req, res) => {
        const locals = {
            codes: acceptedTotps(process.env.key, 5, 30)
        }
        return res.render('totp/generate', locals)
    });

// example of a url for totp - otpauth://totp/Vault:user@test.com?algorithm=SHA1&digits=6&issuer=Vault&period=30&secret=V7MBSK324I7KF6KVW34NDFH2GYHIF6JY

export default router;