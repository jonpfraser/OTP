import crypto from 'crypto';
import { dynamicTruncate } from './shared.js';

const acceptedHotps = (key, counter, window) => {
    const otps = [];
    let i = 0;

    do {
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

const verifyHotp = (key, counter, window, otp) => {
    const otps = acceptedHotps(key, counter, window);
    return otps.includes(otp.toString());
}

export { acceptedHotps, verifyHotp };