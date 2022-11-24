const Spider = require('../models');
const getTotalUsers = require('./getTotalUsers');
const scrollDown = require('./scrollDown');
const timeout = require('./timeout');

async function checkNewUsers(driver, countLastUserSaved) {
  console.log('---- ---- --------------- ---- ----');
  console.log('---- ---- Check New Users ---- ----');
  console.log('---- ---- --------------- ---- ----');

  const $userLinks = await getTotalUsers(driver);
  const countUsers = $userLinks.length;

  console.log('---- Last count User Checked', countLastUserSaved);
  console.log('---- Current count Users', countUsers);
  const users = await Spider.find().select('username').select('category');
  console.log('Unit User in DB:', users.length);

  if (countLastUserSaved < countUsers) {
    console.log('-- -------- --');
    console.log('-- continue --');
    console.log('-- -------- --');
  } else {;
    console.log('--- Before timeout ---');
    await timeout(5000);
    await scrollDown(driver);
    await checkNewUsers(driver, countLastUserSaved);
    console.log('--- After timeout ---');
  }
}

module.exports = checkNewUsers;
