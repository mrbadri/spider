const { BASEURL, CATEGORIES } = require('./constant');

config = () => {
  const numberCategory = Number(process.argv[2] || 0);
  const category = CATEGORIES[numberCategory];

  return {
    headless: process.env.HEADLESS === 'true',
    dbUrl: process.env.DB_URL,
    url: BASEURL + category,
    task: process.env.TASK,
    numberCategory,
    category
  };
};

module.exports = config;
