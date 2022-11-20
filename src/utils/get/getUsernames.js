const checkNewUsers = require('../checkNewUsers');
const getTotalUsers = require('../getTotalUsers');
const scrollDown = require('../scrollDown');
const getInfo = require('../get/getInfo');
const switchNextTab = require('../switchNextTab');
const { By } = require('selenium-webdriver');
const saveUsername = require('../save/saveUsername');

async function getUsernames(driver, count = 0) {
  console.log('--- --- --- Get Usernames --- --- ---');

  await checkNewUsers(driver, count);

  const currentUrl = await driver.getCurrentUrl();
  const category = currentUrl.split('/')[4];
  const $userLinks = await getTotalUsers(driver);
  const countUsers = $userLinks.length;

  for (let i = count; i < countUsers; i++) {
    const link = $userLinks[i];
    const href = await link.getAttribute('href');
    const username = href.split('/')[3];

    await saveUsername(username, category);

    console.log(username, category);
  }

  await getUsernames(driver, countUsers);
}

module.exports = getUsernames;
