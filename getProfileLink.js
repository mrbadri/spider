const { By } = require('selenium-webdriver');
const getInfo = require('./getInfo');
const scrollDown = require('./scrollDown');

/**
 * @function getProfileLink get link profile from landing dribble and open in new tab
 * @param {Object} driver
 */
async function getProfileLink(driver, count = 0) {
  const profileLinks = await driver.findElements(By.css('.user-information a.hoverable'));

  console.log('--- --- --- Get Profile Link --- --- ---');
  console.log('count first user:', count);
  console.log('total username:', profileLinks.length);

  if (count !== 0) {
    scrollDown(driver);
  }

  for (let i = count; i < profileLinks.length; i++) {
    const link = profileLinks[i];
    const href = await link.getAttribute('href');
    // open info users in new tabs
    driver.executeScript(`window.open('${href}/about', '${i}');`);
  }

  const originalWindow = await driver.getAllWindowHandles();

  await driver.switchTo().window(originalWindow[profileLinks.length - 1]);

  await getInfo(driver, profileLinks.length - 1, profileLinks.length);
}

module.exports = getProfileLink;
