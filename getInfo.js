const { By, until } = require('selenium-webdriver');
const extractEmails = require('./extractEmail');
const getProfileLink = require('./getProfileLink');

async function getInfo(driver, windowNumber, newCount) {
  console.log('LOADING ...');
  //   await until.elementLocated(By.css('.bio-text'));
  // https://dribbble.com/mike-bruner/about

  const currentUrl = await driver.getCurrentUrl();
  const username = currentUrl.split('/')[3];

  const $bioText = await driver.findElements(By.css('.bio-text'));
  const bioText = $bioText.length !== 0 ? await $bioText[0]?.getText() : null;
  const email = extractEmails(bioText) ? extractEmails(bioText)[0] : null;
  //   const $website = await driver.findElement(By.css('.elsewhere-website'));
  //   const $instagram = await driver.findElement(By.css('.elsewhere-instagram'));

  console.log('----- ----- ----- INFORMATION ----- ----- -----');
  console.log('Username:', username);
  console.log('--- --- ---');
  console.log('Bio Text:', bioText);
  console.log('--- --- ---');
  console.log('Email: ', email);
  console.log('--- --- ---');
  console.log('Website:', `https://dribbble.com/${username}/click?type=site`);
  console.log('--- --- ---');
  console.log('Instagram:', `https://dribbble.com/${username}/click?type=instagram`);
  console.log('--- --- ---');
  console.log('----- URL:', currentUrl);

  await driver.close();
  const originalWindow = await driver.getAllWindowHandles();
  await driver.switchTo().window(originalWindow[windowNumber]);

  if (currentUrl !== 'https://dribbble.com/') await getInfo(driver, windowNumber - 1, newCount);
  else await getProfileLink(driver, newCount);
}

module.exports = getInfo;
