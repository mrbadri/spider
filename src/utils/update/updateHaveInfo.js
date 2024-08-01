const UserProfile = require('../../models/userProfile');

async function updateHaveInfo(input = false) {
  try {
    const result = await UserProfile.updateMany({ haveInfo: !input }, { $set: { haveInfo: input } });

    console.log(`${result.matchedCount} documents matched the filter, updated ${result.modifiedCount} documents`);
  } catch (error) {
    console.log('error update have info', error);
  }
}

module.exports = updateHaveInfo;
