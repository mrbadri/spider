const { By, until } = require('selenium-webdriver');
const Spider = require('../../models/userProfile');
const extractEmails = require('../extractEmail');
const saveInfo = require('../save/saveInfo');
const showCounts = require('../show/counts');
const switchNextTab = require('../switchNextTab');
const timeout = require('../timeout');
const getAboutLink = require('./getAboutLink');
const saveUrlUser = require('../save/saveUrlUser');
const saveUsername = require('../save/saveUsername');
const updateHaveInfo = require('../update/updateHaveInfo');

const getSocialLink = async (driver, target) => {
  try {
    const element = await driver.findElement(By.css(`a[data-social='${target}']`));
    if (element) {
      return await element.getAttribute('href');
    }
  } catch (error) {
    console.error(`Error finding social link for ${target}:`, error.message);
  }
  return null;
};

const getMemberList = async (driver) => {
  const $members = (await driver.findElements(By.css('.team-members-list .team-members-list-item a'))) || null;

  const members = [];
  for (let i = 0; i < $members.length; i++) {
    const username = await $members[i].getAttribute('href');

    members.push(username?.split('/')?.[3]);

    await saveUsername({ username });
  }

  return members;
};
const getSkillList = async (driver) => {
  const $skills = (await driver.findElements(By.css('.skills-list a'))) || null;
  const skills = [];

  for (let i = 0; i < $skills.length; i++) {
    const skill = await $skills[i].getAttribute('data-skill');
    const url = await $skills[i].getAttribute('href');

    skills.push(skill);

    await saveUrlUser({ url });
  }

  return skills;
};

async function getInfo(driver) {
  console.log('Get Info is LOADING ...');

  // updateHaveInfo(false);

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

    const bio = (await driver.findElement(By.css('.profile-section-bio'))?.getText()) || null;
    const email = extractEmails(bio)?.[0] || null;
    const location = (await driver.findElement(By.css('.location'))?.getText()) || null;
    const medium = await getSocialLink(driver, 'Medium');
    const linkedin = await getSocialLink(driver, 'LinkedIn');
    const instagram = await getSocialLink(driver, 'Instagram');
    const twitter = await getSocialLink(driver, 'Twitter');
    const site = await getSocialLink(driver, 'user-website');
    const skills = await getSkillList(driver);
    const members = await getMemberList(driver);

    const info = {
      username,
      bio,
      email,
      location,
      medium,
      linkedin,
      instagram,
      twitter,
      site,
      skills,
      members
    };

    console.log('===>>> INFO:', info);

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
