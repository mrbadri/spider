const { BASEURL, CATEGORIES } = require('./constant');

config = () => {
  const numberCategory = process.argv[2] || 0;
  const category = CATEGORIES[Number(numberCategory)];

  return {
    headless: process.env.HEADLESS === 'true',
    dbUrl: process.env.DB_URL,
    url: BASEURL + category,
    task: process.env.TASK,
    category
  };
};

module.exports = config;
