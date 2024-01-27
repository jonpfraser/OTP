// @ts-check
import { test, expect } from '@playwright/test';
import { acceptedHotps } from '../src/utils/hotp.js';
import dotenv from 'dotenv';

dotenv.config();

test('successful verification with counter sync', async ({ request }) => {
  const otp = acceptedHotps(process.env.key, 1, 5);
  const totp = await request.post('/hotp', {
    data: {
      otp: otp[0]
    }
  })

  await expect(totp.ok()).toBeTruthy();

  let verified = await totp.body().then(b => {
    return JSON.parse(b.toString());
  });

  await expect(verified).toEqual(true);
});

test('successful verification with counter desync', async ({ request }) => {
  const otp = acceptedHotps(process.env.key, 0, 5);
  const totp = await request.post('/hotp', {
    data: {
      otp: otp[1]
    }
  })

  await expect(totp.ok()).toBeTruthy();

  let verified = await totp.body().then(b => {
    return JSON.parse(b.toString());
  });

  await expect(verified).toEqual(true);
});

test('unsuccessful verification with counter desync', async ({ request }) => {
  const otp = acceptedHotps(process.env.key, 0, 5);
  const totp = await request.post('/hotp', {
    data: {
      otp: otp[0]
    }
  })

  await expect(totp.ok()).toBeTruthy();

  let verified = await totp.body().then(b => {
    return JSON.parse(b.toString());
  });

  await expect(verified).toEqual(false);
});