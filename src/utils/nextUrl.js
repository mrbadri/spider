const { CATEGORIES, BASEURL } = require('../constant');

async function nextUrl(driver) {
  const currentUrl = await driver.getCurrentUrl();
  const category = currentUrl.split('/')[4];
  const numberCategory = CATEGORIES.indexOf(category);

  const newCategory = CATEGORIES[(numberCategory + 1) % CATEGORIES.length];
  const url = BASEURL + newCategory;
  console.log('----- -------- ----- ----- ----- ');
  console.log('----- NEXT URL -----', url);
  console.log('----- -------- ----- ----- ----- ');

  return url;
}

module.exports = nextUrl;
