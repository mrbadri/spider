const { BASEURL, CATEGORIES } = require('./constant');

config = () => {
  const category = CATEGORIES[0];

  return {
    url: BASEURL + category,
    dbUrl: process.env.DB_URL,
  };
};

module.exports = config;
