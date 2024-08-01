const { BASEURL, CATEGORIES } = require('./constant');

config = () => {
  const numberCategory = Number(process.argv[2] || 0);
  const category = CATEGORIES[numberCategory];
  // const url = BASEURL + category;
  // const task = process.env.TASK;

  return {
    headless: process.env.HEADLESS === 'true',
    dbUrl: process.env.DB_URL,
    url: 'https://dribbble.com/search/landing-page',
    task: 'getInfo',
    numberCategory,
    category
  };
};

module.exports = config;
