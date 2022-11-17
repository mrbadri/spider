const { Builder, Browser, By, Key, until, Keys } = require('selenium-webdriver');
const getProfileLink = require('./getProfileLink');
const express = require('express');
const mysql = require('mysql');
const { URL } = require('./constant');

console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- START --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');
console.log('-- -- -- --- ----- --- -- -- --');

(async function spider() {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();
  console.log('Spider is LOADING ...');

  try {
    await driver.get(URL);
    await getProfileLink(driver);
  } catch (error) {
    console.log('----- ERROR -----');
    console.log(error);
    await driver.quit();
    spider();
  }
})();
