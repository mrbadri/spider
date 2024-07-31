const UserUrl = require('../../models/userUrl');

async function saveUrlUser({ url }) {
  console.log(`--- --- --- --- --- --- --- --- - --- ---`);
  console.log(`--- --- Loading for Save URL --- ---`);
  console.log(`--- --- URL: ${url}  `);
  console.log(`--- --- --- --- --- --- --- --- - --- ---`);

  try {
    // Check if the URL already exists
    const existingUrl = await UserUrl.findOne({ url });

    if (existingUrl) {
      console.log(`--- URL: '${url}' already exists. ---`);
      return false;
    }

    // If URL does not exist, create a new entry
    const newUrl = await UserUrl.create({ url });
    console.log(`--- URL: '${url}' saved. ---`);
    return true;
  } catch (err) {
    console.log('--- Error in saving URL ---');
    console.log(err.message);
    return false;
  }
}

module.exports = saveUrlUser;
