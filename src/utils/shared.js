const dynamicTruncate = (hmacValue) => {
    const offset = hmacValue[hmacValue.length - 1] & 0xf;
    const binaryCode =
        ((hmacValue[offset] & 0x7f) << 24) |
        ((hmacValue[offset + 1] & 0xff) << 16) |
        ((hmacValue[offset + 2] & 0xff) << 8) |
        (hmacValue[offset + 3] & 0xff);
    const otp = binaryCode % 10 ** 6;
    return otp.toString().padStart(6, '0');
}

export { dynamicTruncate };