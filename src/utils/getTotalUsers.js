const { By } = require('selenium-webdriver');

async function getTotalUsers(driver) {
  const currentUrl = await driver.getCurrentUrl();
  let address = '';

  switch (currentUrl) {
    case 'https://dribbble.com/marketplace/graphics':
      address = '.good-details a.good-title-text.font-body-small';
      break;

    default:
      address = '.user-information a.hoverable';
      break;
  }
  const users = await driver.findElements(By.css(address));
  return users;
}

module.exports = getTotalUsers;
