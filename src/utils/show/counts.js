const Spider = require('../../models/userProfile');

const showCounts = async () => {
  const users = await Spider.find();
  const usersHaveInfo = await Spider.find({ haveInfo: true });
  const emails = await Spider.find({ email: { $exists: true, $ne: null } });
  console.log('All Users in DB:', users.length);
  console.log('Users Have Info in DB:', usersHaveInfo.length);
  console.log('Users do not Have Info in DB:', users.length - usersHaveInfo.length);
  console.log('Emails:', emails.length);

  return {
    countUsers: users.length,
    countUsersHaveInfo: usersHaveInfo.length,
    countUsersDontHaveInfo: users.length - usersHaveInfo.length,
    countEmails: emails.length
  };
};

module.exports = showCounts;
