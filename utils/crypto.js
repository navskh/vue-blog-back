import crypto from 'crypto';
import path from 'path';
const __dirname = path.resolve();
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(__dirname, `/.env`),
});

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

export const encrypt = text => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};
// var a = {
//   server: '10.1.4.101',
//   port: 1433,
//   database: 'UnivManage',
//   user: 'bankweb',
//   password: 'A!123456',
//   synchronize: true,
//   trustServerCertificate: true,
// };

// console.log(encrypt(JSON.stringify(a)));

export const decrypt = enc => {
  let textParts = enc.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let decrypted = decipher.update(encryptedText);
  return Buffer.concat([decrypted, decipher.final()]).toString();
};
