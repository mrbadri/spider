const { By } = require('selenium-webdriver');

async function getTotalUsers(driver) {
  const users = await driver.findElements(By.css('.user-information a.hoverable'));
  return users;
}

module.exports = getTotalUsers;
