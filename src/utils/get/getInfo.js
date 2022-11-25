const { By, until } = require('selenium-webdriver');
const Spider = require('../../models');
const extractEmails = require('../extractEmail');
const saveInfo = require('../save/saveInfo');
const showCounts = require('../show/counts');
const switchNextTab = require('../switchNextTab');
const timeout = require('../timeout');
const getAboutLink = require('./getAboutLink');

async function getInfo(driver) {
  console.log('Get Info is LOADING ...');

  const users = await Spider.find({ haveInfo: false }).limit(20);
  let user = users[0];


  // when you open multi terminal with ( yarn run get-info ) this condition help you don't get same user info
  if (users.length > 10) {
    user = users[Math.ceil(Math.random() * 10)];
    console.log(Math.ceil(Math.random() * 10));
  }

  if (user) {
    const { username } = user;
    const link = getAboutLink(username);

    console.log('-- -- --- ----- --- -- -- -- -- -- -- --');
    console.log('-- -- --- ----- --- -- -- -- -- -- -- --');
    console.log(`-- -- --- GET INFO  -- -- ${username}`);
    console.log('-- -- --- ----- --- -- -- -- -- -- -- --');
    console.log('-- -- --- ----- --- -- -- -- -- -- -- --');

    await driver.get(link);

    const $bio = await driver.findElements(By.css('.bio-text'));
    const bio = $bio.length !== 0 ? await $bio[0]?.getText() : null;
    const email = extractEmails(bio) ? extractEmails(bio)[0] : null;

    const info = {
      username,
      bio,
      email,
      website: `https://dribbble.com/${username}/click?type=site`,
      instagram: `https://dribbble.com/${username}/click?type=instagram`,
    };

    await saveInfo(info);
    console.log('--- --- --- --- --- --- --- --- ---');
    console.log('Username:', username);
    console.log('--- --- ---');
    console.log('Bio Text:', bio);
    console.log('--- --- ---');
    console.log('Email: ', email);
    console.log('--- --- --- --- --- --- --- --- ---');
    await showCounts();
  } else {
    console.log('-------------------------');
    console.log('Waiting For Get New Users');
    console.log('-------------------------');
    await timeout(5000);
  }

  await getInfo(driver);
}

module.exports = getInfo;
