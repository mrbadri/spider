const { By, until } = require('selenium-webdriver');
const getProfileLink = require('./getProfileLink');

async function getInfo(driver, windowNumber) {
  console.log('LOADING ...');
  //   await until.elementLocated(By.css('.bio-text'));

  const currentUrl = await driver.getCurrentUrl();
  const username = currentUrl.split('/')[3];

  const $bioText = await driver.findElement(By.css('.bio-text'));
  //   const $website = await driver.findElement(By.css('.elsewhere-website'));
  //   const $instagram = await driver.findElement(By.css('.elsewhere-instagram'));

  console.log('----- ----- ----- INFORMATION ----- ----- -----');
  console.log('Username:', username);
  console.log('--- --- ---');
  console.log('Bio Text:', await $bioText?.getText());
  console.log('--- --- ---');
  console.log('Website:', `https://dribbble.com/${username}/click?type=site`);
  console.log('--- --- ---');
  console.log('Instagram:', `https://dribbble.com/${username}/click?type=instagram`);
  console.log('--- --- ---');
  console.log('----- URL:', currentUrl);

  await driver.close();
  const originalWindow = await driver.getAllWindowHandles();
  await driver.switchTo().window(originalWindow[windowNumber]);

  if (currentUrl !== 'https://dribbble.com/') await getInfo(driver, windowNumber - 1);
  //   else await getProfileLink(driver);
}

module.exports = getInfo;
