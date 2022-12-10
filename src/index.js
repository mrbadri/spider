const { WINDOW_WIDTH, WINDOW_HEIGHT, PROXY_LIST } = require('./constant');
const { Builder, Browser } = require('selenium-webdriver');
const getUsernames = require('./utils/get/getUsernames');
const chrome = require('selenium-webdriver/chrome');
const showCounts = require('./utils/show/counts');
const showUsers = require('./utils/show/users');
const getInfo = require('./utils/get/getInfo');
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
const { dbUrl, url, headless, task } = config();

// connection with DB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to db!');
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * @function spider
 */
(async function spider(proxyCount = 0) {
  console.log('Spider is LOADING ...');

  // Handle Create Driver
  const screen = {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT
  };

  const PROXY = PROXY_LIST[proxyCount % PROXY_LIST.length];
  console.log('---- ------');
  console.log('---- PROXY:', PROXY);
  console.log('---- ------');

  let driver;

  switch (task) {
    case 'getUsername':
    case 'getInfo':
      if (headless) {
        driver = await new Builder()
          .forBrowser(Browser.CHROME)
          .setChromeOptions(new chrome.Options().headless().addArguments(`--proxy-server=http://${PROXY}`))
          .build();
      } else {
        driver = await new Builder()
          .forBrowser(Browser.CHROME)
          .setChromeOptions(new chrome.Options().windowSize(screen).addArguments(`--proxy-server=http://${PROXY}`))
          .build();
      }
      break;
  }

  // Run Tasks
  try {
    switch (task) {
      case 'getInfo':
        await getInfo(driver);
        break;

      case 'getUsername':
        await driver.get(url);
        await getUsernames({ driver, count: 0 });

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

      case 'sendMail':
        const [arg1, arg2, title = '', content = ''] = process.argv;

        await sendMail({ title, content });
        break;

      case 'showCounts':
        await showCounts();
        break;

      default:
        console.log('-----------------------');
        console.log('Please Enter Valid Task');
        console.log('-----------------------');
        break;
    }
  } catch (error) {
    console.log('----- -- -- -----');
    console.log('----- ERROR -----');
    console.log('----- -- -- -----');
    console.log(error);

    sendMail({ error });
    if (driver) await driver.quit();
    console.log('I comme back :)');
    spider(proxyCount + 1);
  }
})();
