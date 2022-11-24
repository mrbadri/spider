const { Builder, Browser } = require('selenium-webdriver');
const getUsernames = require('./utils/get/getUsernames');
const sendMail = require('./utils/sendMail');
const mongoose = require('mongoose');
const config = require('./config');
const Spider = require('./models');
require('dotenv').config();

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');

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
  const task = process.env.TASK;
  console.log('--- task:', task);

  const users = await Spider.find().select('username').select('category');
  console.log('USER List:', users);

  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  console.log('Spider is LOADING ...');

  try {
    switch (task) {
      case 'getInfo':
        console.log('get info');
        break;

      case 'getUsername':
        await getUsernames(driver, 0, url);
        break;

      default:
        await getUsernames(driver, 0, url);
        break;
    }
  } catch (error) {
    console.log('----- ERROR -----');
    console.log(error);

    sendMail();
    await driver.quit();
    console.log('I comme back :)');
    spider();
  }
})();
