const Spider = require('../../models');

async function saveUsername(username, category) {
  console.log(`--- --- --- --- --- --- --- --- - --- ---`);
  console.log(`--- --- Loading for Save username --- ---`);
  console.log(`--- --- --- --- --- --- --- --- - --- ---`);

  const haveThisUser = await Spider.find({ username });

  if (haveThisUser.length === 0) {
    try {
      await Spider.create({ username, category });
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');
      console.log(`--- username: '${username}' saved.`);
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');

      return true;
    } catch (err) {
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');
      console.log('--- - Error in save username - --- ');
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');
      console.log(err.message);
      console.log(err.errors.username);
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');
      console.log('--- -- -- -- -- -- -- -- -- -- --- ');

      return false;
    }
  } else {
    console.log('--- -- -- -- -- -- -- -- -- -- --- ');
    console.log(`--- username: '${username}' was exist!`);
    console.log('--- -- -- -- -- -- -- -- -- -- --- ');

    Spider.up

    return false;
  }
}

module.exports = saveUsername;
