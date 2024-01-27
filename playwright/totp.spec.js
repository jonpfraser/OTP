// @ts-check
import { test, expect } from '@playwright/test';
import { acceptedTotps } from '../src/utils/totp.js';
import dotenv from 'dotenv';

dotenv.config();

test('successful verification', async ({ request }) => {
  const otp = acceptedTotps(process.env.key, 1, 30);
  const totp = await request.post('/totp', {
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

test('testing a failure to verify', async ({ request }) => {
  const totp = await request.post('/totp', {
    data: {
      otp: '123456'
    }
  })

  await expect(totp.ok()).toBeTruthy();

  let verified = await totp.body().then(b => {
    return JSON.parse(b.toString());
  });

  await expect(verified).toEqual(false);
});

test('outside of window range', async ({ request }) => {
  const otp = acceptedTotps(process.env.key, 3, 30);
  const totp = await request.post('/totp', {
    data: {
      otp: otp[2]
    }
  })

  await expect(totp.ok()).toBeTruthy();

  let verified = await totp.body().then(b => {
    return JSON.parse(b.toString());
  });

  await expect(verified).toEqual(true);
});
