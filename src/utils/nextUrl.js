const { By } = require('selenium-webdriver');
const saveUrlUser = require('./save/saveUrlUser');
const getUrl = require('./getUrl');

async function nextUrl(driver) {
  const $links = await driver.findElements(By.css('.search-results-suggestion a'));

  for (let i = 0; i < $links.length; i++) {
    const url = await $links[i].getAttribute('href');

    // Save the URL independently
    await saveUrlUser({ url });
  }

  return getUrl();
}

module.exports = nextUrl;
