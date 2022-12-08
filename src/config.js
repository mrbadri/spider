const { BASEURL, CATEGORIES } = require('./constant');

config = () => {
  const numberCategory = process.argv[2] || 0;
  const category = CATEGORIES[Number(numberCategory)];

  return {
    url: BASEURL + category,
    dbUrl: process.env.DB_URL,
    headless: process.env.HEADLESS === 'true',
    task: process.env.TASK
  };
};

module.exports = config;
