const { By } = require('selenium-webdriver');

async function getTotalUsers(driver) {
  const currentUrl = await driver.getCurrentUrl();
  let address = '';

  switch (currentUrl) {
    case 'https://dribbble.com/':
      address = '.user-information a.hoverable';
      break;

    default:
      if (currentUrl.includes('https://dribbble.com/search')) address = '.user-information a.hoverable';
      else address = '.good-details a.good-title-text.font-body-small';
      break;
  }
  const users = await driver.findElements(By.css(address));

  console.log('##########====>>> Find User:', users.length);
  return users;
}

module.exports = getTotalUsers;
