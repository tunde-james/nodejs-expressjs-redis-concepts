// Objects that helps to handle binary data
// Use cases 1. file system operations 2. cryptography 3. image processing

const buffer1 = Buffer.alloc(10); // allocate a buffer of 10 bytes
console.log(buffer1);

const bufferFromString = Buffer.from('Hello');
console.log(bufferFromString);

const bufferFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 5, 0]);
console.log(bufferFromArrayOfIntegers);

// Write a string to a buffer
buffer1.write('Node JS');
console.log('After writing Node JS to buffer1', buffer1.toString());

// Read a single byte from a buffer
console.log(bufferFromString[0]);

console.log(bufferFromString.slice(0, 3));

const concatBuffs = Buffer.concat([buffer1, bufferFromString]);
console.log(concatBuffs);

console.log(concatBuffs.toJSON());
