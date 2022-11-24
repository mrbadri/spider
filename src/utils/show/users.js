const Spider = require('../../models');

const showUsers = async () => {
  const users = await Spider.find();
  console.log('USER List:', users);
};

module.exports = showUsers;
