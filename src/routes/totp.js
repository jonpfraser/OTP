import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

import { verifyTotp } from '../utils/totp.js';

router.route('/')
    .post(async (req, res) => {
        const verified = verifyTotp(process.env.key, 5, 30, req.body.otp);
        return res.send(verified);
    })

// example of a url for totp - otpauth://totp/Vault:user@test.com?algorithm=SHA1&digits=6&issuer=Vault&period=30&secret=V7MBSK324I7KF6KVW34NDFH2GYHIF6JY

export default router;