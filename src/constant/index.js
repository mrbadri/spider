const PROXY_LIST = require('./proxyList');

const CONSTANT = {
  BASEURL: 'https://dribbble.com/marketplace/',
  CATEGORIES: ['graphics', '3d', 'templates', 'themes', 'fonts', 'add-ons'],
  WINDOW_WIDTH: 640,
  WINDOW_HEIGHT: 960,
  TRY_PER_URL: 5,
  TIME_PER_TRY: 5000,
  PROXY_LIST
};

module.exports = CONSTANT;
