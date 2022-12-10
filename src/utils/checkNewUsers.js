const Spider = require('../models');

const { TRY_PER_URL, TIME_PER_TRY } = require('../constant');
const getUsernames = require('./get/getUsernames');
const getTotalUsers = require('./getTotalUsers');
const showCounts = require('./show/counts');
const scrollDown = require('./scrollDown');
const sendMail = require('./sendMail');
const timeout = require('./timeout');
const nextUrl = require('./nextUrl');

async function checkNewUsers(driver, countLastUserSaved, getUsernames, count = 0) {
  console.log('---- ---- --------------- ---- ----');
  console.log('---- ---- Check New Users ---- ----');
  console.log(`---- ---- Count: ${count} ---- ----`);
  console.log('---- ---- --------------- ---- ----');

  if (count > TRY_PER_URL) {
    await sendMail({ error: "We Don't Have New Post!" });
    await driver.get(await nextUrl(driver));
    await getUsernames({ driver, count: 0 });
  }

  const $userLinks = await getTotalUsers(driver);
  const countUsers = $userLinks.length;

  console.log('---- Last count Posts Checked', countLastUserSaved);
  console.log('---- Current count Posts', countUsers);
  await showCounts();

  if (countLastUserSaved < countUsers) {
    console.log('-- -------- --');
    console.log('-- continue --');
    console.log('-- -------- --');
  } else {
    console.log('--- Before timeout ---');
    await timeout(TIME_PER_TRY);
    console.log('--- After timeout ---');

    await scrollDown(driver);
    await checkNewUsers(driver, countLastUserSaved, getUsernames, count + 1);
  }
}

module.exports = checkNewUsers;
