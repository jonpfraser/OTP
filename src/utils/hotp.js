import crypto from 'crypto';
import { dynamicTruncate } from './shared.js';
import thirtyTwo from 'thirty-two';

const acceptedHotps = (key, counter, window) => {
    const otps = [];
    let i = 0;

    do {
        const counterBuffer = Buffer.alloc(6);
        counterBuffer.writeUIntBE(counter + i, 0, 6);

        const hmac = crypto.createHmac('sha1', Buffer.from(thirtyTwo.decode(key).toString('hex')));
        hmac.update(counterBuffer);
        const hmacResult = hmac.digest();
        otps.push(dynamicTruncate(hmacResult));
        i++;
    } while (i < window);

    return otps;
};

const verifyHotp = (key, counter, window, hotp) => {
    const hotps = acceptedHotps(key, counter, window);
    const verified = hotps.includes(hotp.toString());
    const index = hotps.indexOf(hotp.toString());
    return { verified, index };
};

export { acceptedHotps, verifyHotp };