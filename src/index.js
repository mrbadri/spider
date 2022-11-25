const { Builder, Browser } = require('selenium-webdriver');
const getUsernames = require('./utils/get/getUsernames');
const sendMail = require('../sendMail');
const mongoose = require('mongoose');
const config = require('./config');
const showUsers = require('./utils/show/users');
const getInfo = require('./utils/get/getInfo');
const Spider = require('./models');
require('dotenv').config();

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');

const task = process.env.TASK;

console.log('--- -- --- ----- --- --- ---- -');
console.log(`--- -- MY TASK IS ${task}`);
console.log('--- -- --- ----- --- --- ---- -');

// get config
const { dbUrl, url } = config();

// connection with DB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to db!');
  })
  .catch(err => {
    console.log(err);
  });

/**
 * @function spider
 */
(async function spider() {
  console.log('Spider is LOADING ...');

  const driver =
    (task === 'getUsername' || task === 'getInfo') &&
    (await new Builder().forBrowser(Browser.CHROME).build());

  try {
    switch (task) {
      case 'getInfo':
        await getInfo(driver);
        break;

      case 'getUsername':
        await driver.get(url);
        await getUsernames({ driver, count: 0, url });
        break;

      case 'showUsers':
        await showUsers();
        break;

      case 'clearUsers':
        await Spider.deleteMany({});
        console.log('----- -- -- - -----');
        console.log('----- Cleared -----');
        console.log('----- -- -- - -----');
        break;

      default:
        await getUsernames({ driver, count: 0, url });
        break;
    }
  } catch (error) {
    console.log('----- -- -- -----');
    console.log('----- ERROR -----');
    console.log('----- -- -- -----');
    console.log(error);

    sendMail({ error });
    await driver.quit();
    console.log('I comme back :)');
    spider();
  }
})();
