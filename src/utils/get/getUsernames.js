const saveUsername = require('../save/saveUsername');
const checkNewUsers = require('../checkNewUsers');
const getTotalUsers = require('../getTotalUsers');

async function getUsernames({ driver, count = 0 }) {
  console.log('--- --- --- Get Usernames --- --- ---');
  await checkNewUsers(driver, count , getUsernames);

  const currentUrl = await driver.getCurrentUrl();
  const category = currentUrl.split('/')[4];
  const $userLinks = await getTotalUsers(driver);
  const countUsers = $userLinks.length;

  for (let i = count; i < countUsers; i++) {
    const link = $userLinks[i];
    const href = await link.getAttribute('href');
    const username = href.split('/')[3];
    const currentUrl = await driver.getCurrentUrl();
    const source = currentUrl.split('/')[2];

    await saveUsername({ username, category, source });
  }

  await getUsernames({ driver, count: countUsers });
}

module.exports = getUsernames;
