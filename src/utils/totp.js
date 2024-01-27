import crypto from 'crypto';
import { dynamicTruncate } from './shared.js';

const acceptedTotps = (key, window, timeStep) => {
    const otps = [];
    let i = 0;

    do {
        const counter = Math.floor(Date.now() / 1000 / timeStep);
        const counterBuffer = Buffer.alloc(6);
        counterBuffer.writeUIntBE(counter + i, 0, 6);

        const hmac = crypto.createHmac('sha1', Buffer.from(key, 'hex'));
        hmac.update(counterBuffer);
        const hmacResult = hmac.digest();
        otps.push(dynamicTruncate(hmacResult));
        i++;
    } while (i < window);

    return otps;
}

const verifyTotp = (key, window, timeStep, otp) => {
    const otps = acceptedTotps(key, window, timeStep);
    return otps.includes(otp.toString());
}

export { acceptedTotps, verifyTotp };