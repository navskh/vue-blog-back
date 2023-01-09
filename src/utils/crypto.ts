import * as crypto from 'crypto';
const path = require('path');
// const __dirname = path.resolve();
const dotenv = require('dotenv');

if (process.env.NODE_ENV == 'outterdev') {
  dotenv.config({
    path: path.join(__dirname, `../../.env.development`),
  });  
}


else if (process.env.NODE_ENV == 'innerdev') {
  dotenv.config({
    path: path.join(__dirname, `../../.env.local`),
  });
}


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

const encrypt = (text: any) => {
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

/**외부망 DEV DB 연결 Config */
// var outterdev = {
//   server: '10.1.4.101',
//   port: 1433,
//   database: 'UnivManage',
//   user: 'bankweb',
//   password: 'A!123456',
//   synchronize: true,
//   trustServerCertificate: true,
//   encrypt: false, 
// };
// console.log(encrypt(JSON.stringify(outterdev)));

/**내부망 DEV DB 연결 Config */
// var innerdev = {
//   user: 'bankweb',
//   password: 'A!12345',
//   server: '192.168.2.13',
//   database: 'UnivManage',
//   port: 1433,
//   synchronize: true,
//   trustServerCertificate: true,
//   encrypt: false, 
// };

// console.log(encrypt(JSON.stringify(innerdev)));


const decrypt = (enc: any) => {
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

module.exports = {
  decrypt,
  encrypt
}
