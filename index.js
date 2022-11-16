const { Builder, Browser, By, Key, until, Keys } = require('selenium-webdriver');
const getProfileLink = require('./getProfileLink');

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    console.log('LOADING ...');

    await driver.get('https://dribbble.com/');
    await getProfileLink(driver);
  } finally {
    // await driver.quit();
  }
})();
