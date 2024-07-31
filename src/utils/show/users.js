const Spider = require('../../models/userProfile');

const showUsers = async () => {
  const users = await Spider.find();
  console.log('USER List:', users);
};

module.exports = showUsers;
