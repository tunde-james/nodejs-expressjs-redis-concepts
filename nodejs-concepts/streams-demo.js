// Streams are objects that helps to read and write data from a source piece by piece

// Types of streams
// 1. Readable -> Used for reading
// 2. Writable -> Used to write a file
// 3. Duplex -> Used for both read and write (e.g TCP socket)
// 4. Transform -> zlip streams

const fs = require('fs');
const zlib = require('zlib'); // compression like gzip
const crypto = require('crypto');
const { Transform } = require('stream');

class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]); // encrypt the chunk data

    this.push(encrypted);
    callback();
  }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readableStream = fs.createReadStream('input.txt');

// new gzip object to compress the stream of data
const gzipStream = zlib.createGzip();

const encryptStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream('output.txt.gz.enc');

// read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log('Streaming -> Compressing -> Writing data');
