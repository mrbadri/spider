const Spider = require('../../models/userProfile');

async function saveInfo(props) {
  const { username } = props;
  const userUpdated = await Spider.findOneAndUpdate({ username }, { ...props, haveInfo: 'true' }, { new: true });
  console.log('----- ----- -----');
  console.log('userUpdated:', userUpdated);
  console.log('----- ----- -----');
}

module.exports = saveInfo;
