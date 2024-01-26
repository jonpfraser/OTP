import crypto from 'crypto';

const generateSeedValue = () => {
    // create a sha1 hash of 20 random bytes
    const randomBytesBuffer = crypto.randomBytes(20);
    const sha1 = crypto.createHash('sha1');
    sha1.update(randomBytesBuffer);
    return sha1.digest().toString('hex');
}

export default generateSeedValue;