const Spider = require('../../models');

const showCounts = async () => {
  const users = await Spider.find();
  const usersHaveInfo = await Spider.find({ haveInfo: true });
  console.log('All Users in DB:', users.length);
  console.log('Users Have Info in DB:', usersHaveInfo.length);
  console.log('Users do not Have Info in DB:', users.length - usersHaveInfo.length);
};

module.exports = showCounts;
