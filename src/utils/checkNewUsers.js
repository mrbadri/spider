async function checkNewUsers() {
  console.log('---- ---- DELAY ---- ----');
  sleep
  
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep(fn, ...args) {
  await timeout(3000);
  return fn(...args);
}

module.exports = checkNewUsers;
