import { createHmac } from 'crypto';

export const generateHmacSha256Hash = (data, secret) => {
  if (!data || !secret) {
    throw new Error('Both data and secret are required to generate a hash.');
  }
  // Create HMAC SHA256 hash and encode it in Base64
  const hash = createHmac('sha256', secret).update(data).digest('base64');
  return hash;
};

export const safeStringify = (obj) => {
  const cache = new Set();
  const jsonString = JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        return; 
      }
      cache.add(value);
    }
    return value;
  });
  return jsonString;
};
