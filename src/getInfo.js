const { By, until } = require('selenium-webdriver');
const extractEmails = require('./utils/extractEmail');
const switchNextTab = require('./utils/switchNextTab');

async function getInfo(driver, getProfileLink, newCount = 0) {
  console.log('Get Info is LOADING ...');
  //   await until.elementLocated(By.css('.bio-text'));
  // https://dribbble.com/mike-bruner/about

  const currentUrl = await driver.getCurrentUrl();
  const username = currentUrl.split('/')[3];
  console.log('----- ----- ------- ----------- ------- ----- -----');
  console.log('----- ----- ------- INFORMATION ------- ----- -----');
  console.log('----- ----- ------- ----------- ------- ----- -----');
  console.log('----- URL:', currentUrl);
  console.log('----- ----- ------- ----------- ------- ----- -----');

  if (currentUrl === 'https://dribbble.com/') {
    console.log('---- Back to Home Page ----');
    await getProfileLink(driver, newCount);
    return -1;
  }

  const $bioText = await driver.findElements(By.css('.bio-text'));
  const bioText = $bioText.length !== 0 ? await $bioText[0]?.getText() : null;
  const email = extractEmails(bioText) ? extractEmails(bioText)[0] : null;

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

  await driver.close();
  await switchNextTab(driver);

  await getInfo(driver, getProfileLink, newCount);
}

module.exports = getInfo;
