async function sleep(time = 1000, fn, ...args) {
  await timeout(time);
  return fn(...args);
}

module.exports = sleep;
