const { WINDOW_WIDTH, WINDOW_HEIGHT } = require('./constant');
const { Builder, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const Spider = require('./models/userProfile');
const getUsernames = require('./utils/get/getUsernames');
const showCounts = require('./utils/show/counts');
const showUsers = require('./utils/show/users');
const getInfo = require('./utils/get/getInfo');
const sendMail = require('./utils/sendMail');
const getUrl = require('./utils/getUrl');
require('dotenv').config();

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');

// Load config
const { dbUrl, headless, task } = config();

// Connect to MongoDB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB!'))
  .catch((err) => console.error('DB connection error:', err));

/**
 * Read proxies from a file
 * @param {string} filePath - Path to the proxy list file
 * @returns {string[]} - Array of proxies
 */
function readProxiesFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data
      .split('\n')
      .map((proxy) => proxy.trim())
      .filter((proxy) => proxy);
  } catch (error) {
    console.error('Error reading proxy list:', error);
    return [];
  }
}

/**
 * @function spider
 */
(async function spider(proxyCount = 0) {
  console.log('Spider is LOADING ...');

  const url = getUrl();

  const screen = { width: WINDOW_WIDTH, height: WINDOW_HEIGHT };
  const proxyList = readProxiesFromFile(path.join(__dirname, 'proxylist.txt'));

  if (proxyList.length === 0) {
    console.log('No proxies available, aborting...');
    return;
  }

  const PROXY = proxyList[proxyCount % proxyList.length];
  console.log(`Using PROXY: ${PROXY}`);

  let driver;
  const options = new chrome.Options();
  // TODO: Proxy not work
  // options.addArguments(`--proxy-server=http://${PROXY}`);

  if (headless) {
    options.headless();
  } else {
    options.windowSize(screen);
  }

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
  } catch (error) {
    console.error('Error creating WebDriver:', error);
    return;
  }

  try {
    switch (task) {
      case 'getInfo':
        await getInfo(driver);
        break;
      case 'getUsername':
        console.log('Navigating to URL:', url);
        await driver.get(url);
        // await nextUrl(driver);
        await getUsernames({ driver, count: 0 });
        break;
      case 'showUsers':
        await showUsers();
        break;
      case 'clearUsers':
        await Spider.deleteMany({});
        console.log('Cleared user profiles.');
        break;
      case 'sendMail':
        const [, , title = '', content = ''] = process.argv;
        await sendMail({ title, content });
        break;
      case 'showCounts':
        await showCounts();
        break;
      default:
        console.log('Invalid task specified.');
        break;
    }
  } catch (error) {
    console.error('Task error:', error);
    await sendMail({ error });
    if (driver) await driver.quit();
    spider(proxyCount + 1);
  }

  // if (driver) await driver.quit();
})();
