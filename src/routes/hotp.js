import express from 'express';
import dotenv from 'dotenv';
import { db } from '../app.js';
import { acceptedHotps, verifyHotp } from '../utils/hotp.js';

const router = express.Router();
dotenv.config();

router.route('/')
    .get((req, res) => {
        const locals = {
            title: 'HOTP - Submission',
        }

        return res.render('hotp/submit', locals)
    })
    .post(async (req, res) => {
        await db.read();
        const currentCount = db.data.count;

        const locals = {
            title: 'HOTP - Verification',
            verified: verifyHotp(process.env.key, currentCount, 5, req.body.hotp).verified,
        };

        const index = verifyHotp(process.env.key, currentCount, 5, req.body.hotp).index;

        if (locals.verified) {
            db.data.count = currentCount + index + 1;
            await db.write();
        }

        return res.render('hotp/verify', locals);
    });

router.route('/generate')
    .get(async (req, res) => {
        await db.read()
        const locals = {
            title: 'HOTP - Generator',
            codes: acceptedHotps(process.env.key, db.data.count, 5)
        }
        return res.render('hotp/generate', locals)
    });

router.route('/seed')
    .get(async (req, res) => {
        const locals = {
            title: 'HOTP - Seed',
        }

        db.data.count = 1;
        await db.write();
        return res.status(200).render('hotp/seed', locals);
    });

export default router;