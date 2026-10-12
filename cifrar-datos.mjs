import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const directory = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(directory, 'datos-privados.json');
const keyPath = path.join(directory, '.invite-key');
const outputPath = path.join(directory, 'datos-privados.enc.json');
const aad = Buffer.from('invitacion-bodas-oro:v1');
const rotateKey = process.argv.includes('--rotate-key');

const source = await readFile(sourcePath, 'utf8');
const secret = JSON.parse(source);
if (!Array.isArray(secret.invitados) || !secret.whatsappNumero) {
  throw new Error('datos-privados.json debe incluir invitados y whatsappNumero.');
}

let key;
if (rotateKey) {
  key = randomBytes(32);
  await writeFile(keyPath, key.toString('base64url'), { mode: 0o600 });
} else {
  try {
    key = Buffer.from((await readFile(keyPath, 'utf8')).trim(), 'base64url');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    key = randomBytes(32);
    await writeFile(keyPath, key.toString('base64url'), { mode: 0o600 });
  }
}
if (key.length !== 32) throw new Error('.invite-key no contiene una clave válida.');

const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, iv);
cipher.setAAD(aad);
const ciphertext = Buffer.concat([cipher.update(source, 'utf8'), cipher.final()]);
const encrypted = Buffer.concat([ciphertext, cipher.getAuthTag()]);

const decipher = createDecipheriv('aes-256-gcm', key, iv);
decipher.setAAD(aad);
decipher.setAuthTag(encrypted.subarray(-16));
const verified = Buffer.concat([
  decipher.update(encrypted.subarray(0, -16)),
  decipher.final()
]).toString('utf8');
if (verified !== source) throw new Error('Falló la verificación local del cifrado.');

await writeFile(outputPath, JSON.stringify({
  version: 1,
  iv: iv.toString('base64url'),
  ciphertext: encrypted.toString('base64url')
}, null, 2) + '\n');
console.log(`Archivo cifrado y verificado: ${path.basename(outputPath)}`);
console.log('Código de acceso guardado en .invite-key. Compártelo en un mensaje separado, nunca en la URL.');