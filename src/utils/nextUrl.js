const { CATEGORIES, BASEURL } = require('../constant');
const config = require('./../config');

function nextUrl() {
  const { numberCategory } = config();
  console.log('00000:', numberCategory + 1, CATEGORIES.length);
  const newCategory = CATEGORIES[(numberCategory + 1) % CATEGORIES.length];
  const url = BASEURL + newCategory;

  return url;
}

module.exports = nextUrl;
