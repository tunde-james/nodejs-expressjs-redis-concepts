const fs = require('fs');
const crypto = require('crypto');

// timers -> pending -> callbacks -> idle, prepare -> poll -> check -> close callback

console.log('1. Script start');

setTimeout(() => {
  console.log('2. setTimeout 0s callback (macrotask)');
}, 0);

setTimeout(() => {
  console.log('3. setTimeout 0s callback (macrotask)');
}, 0);

// check phase
setImmediate(() => {
  console.log('4. setImmediate callback (check)');
});

Promise.resolve().then(() => {
  console.log('5. Promise resolved (microtask)');
});

process.nextTick(() => {
  console.log('6. process.nexttick callback (microtask)');
});

fs.readFile(__filename, () => {
  console.log('7. file read operation (I/O callback)');
});

crypto.pbkdf2('secret', 'salt', 10000, 64, 'sha512', (error, key) => {
  if (error) throw error;
  console.log('8. pbkdf2 operation completed (CPU Intensive task)');
});

console.log('9. script ends')