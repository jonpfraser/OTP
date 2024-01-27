import crypto from 'crypto';
import thirtyTwo from 'thirty-two';

function generateSecret() {
    const secret = crypto.randomBytes(20);
    return thirtyTwo.encode(secret).toString();
}

export default generateSecret;