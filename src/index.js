const { Builder, Browser, By, Key, until, Keys } = require('selenium-webdriver');
const getProfileLink = require('./utils/get/getProfileLink');
const express = require('express');
const { URL } = require('./constant');
const sendMail = require('./utils/sendMail');
const mongoose = require('mongoose');
const Spider = require('./models');
const { UserPromptHandler } = require('selenium-webdriver/lib/capabilities');
const saveUsername = require('./utils/save/saveUsername');
const getUsernames = require('./utils/get/getUsernames');
require('dotenv').config();

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');

const dbURL = `mongodb://localhost/spider-test`;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to db!');
  })
  .catch(err => {
    console.log(err);
  });

(async function spider() {
  const users = await Spider.find().select('username').select('category');
  console.log('Count User in DB:', users.length);

  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  console.log('Spider is LOADING ...');

  try {
    await driver.get(URL);
    // await getProfileLink(driver);
    await getUsernames(driver);
  } catch (error) {
    console.log('----- ERROR -----');
    console.log(error);

    sendMail();
    await driver.quit();
    console.log('I comme back :)');
    spider();
  }
})();
