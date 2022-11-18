const { Builder, Browser, By, Key, until, Keys } = require('selenium-webdriver');
const getProfileLink = require('./getProfileLink');
const express = require('express');
const mysql = require('mysql');
const { URL } = require('./constant');
const sendMail = require('./utils/sendMail');

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abcd@1234',
  database: 'spider',
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected');
});

const app = express();

app.listen('3000', () => {
  console.log('Server Start on port 3000');
});

(async function spider() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  console.log('Spider is LOADING ...');

  try {
    await driver.get(URL);
    await getProfileLink(driver);
  } catch (error) {
    console.log('----- ERROR -----');
    console.log(error);

    sendMail();
    await driver.quit();
    spider();
  }
})();
