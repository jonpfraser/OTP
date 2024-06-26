import crypto from 'crypto';
import { dynamicTruncate } from './shared.js';
import thirtyTwo from 'thirty-two';

const acceptedTotps = (key, window, timeStep) => {
    const otps = [];
    let i = 0;

    do {
        const counter = Math.floor(Date.now() / 1000 / timeStep);
        const counterBuffer = Buffer.alloc(6);
        counterBuffer.writeUIntBE(counter + i, 0, 6);

        const hmac = crypto.createHmac('sha1', Buffer.from(thirtyTwo.decode(key).toString('hex')));
        hmac.update(counterBuffer);
        const hmacResult = hmac.digest();
        otps.push(dynamicTruncate(hmacResult));
        i++;
    } while (i < window);

    const currentTime = Date.now() / 1000;
    const nextTimeStep = Math.ceil(currentTime / timeStep) * timeStep;
    const timeLeft = nextTimeStep - currentTime;

    return { otps, timeLeft };
}

const verifyTotp = (key, window, timeStep, totp) => {
    const totps = acceptedTotps(key, window, timeStep);
    return totps.otps.includes(totp.toString());
}

export { acceptedTotps, verifyTotp };