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

const verifyHotp = (key, counter, window, otp) => {
    const otps = acceptedHotps(key, counter, window);
    return otps.includes(otp.toString());
}

const verifyTotp = (key, window, timeStep, otp) => {
    const otps = acceptedTotps(key, window, timeStep);
    return otps.includes(otp.toString());
}

const key = 'd925a97c738a3995d402b1934020629cbb87a34c'
const counter = 0;
const enteredHotp = 215253;
const enteredTotp = acceptedTotps(key, 5, 30)[0];

// console.log(`Seed Value: ${key}\n`);
// console.log(`HOTP Example\n---------------\nEntered OTP: ${enteredHotp}\nCounter: ${counter}\nAccepted OTPs: ${acceptedHotps(key, counter, 5)}\nVerify OTP: ${verifyHotp(key, counter, 5, enteredHotp,)}`);
// console.log(`\nTOTP Example\n---------------\nEntered OTP: ${enteredTotp}\nCounter: ${counter}\nAccepted OTPs: ${acceptedTotps(key, 2, 30)}\nVerify OTP: ${verifyTotp(key, 2, 30, enteredTotp)}`);

export { acceptedHotps, acceptedTotps, verifyHotp, verifyTotp };