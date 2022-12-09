const Spider = require('../../models');

async function saveUsername({ username, category, source }) {
  console.log(`--- --- --- --- --- --- --- --- - --- ---`);
  console.log(`--- --- Loading for Save username --- ---`);
  console.log(`--- --- category: ${category}  `);
  console.log(`--- --- --- --- --- --- --- --- - --- ---`);

  const user = await Spider.findOne({ username });

  if (!user) {
    try {
      await Spider.create({ username, categories: [category], source });
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
    haveNewCategory = !user.categories.includes(category);

    // if have new category update db
    if (haveNewCategory) {
      const categories = new Set(user?.categories || []);
      categories.add(category);

      const userUpdated = await Spider.findOneAndUpdate(
        { username },
        { categories: [...categories] },
        {
          new: true
        }
      );

      console.log('---------------------------------------------');
      console.log('--------------- USER UPDATED ----------------');
      console.log('---------------------------------------------');
      console.log('user updated:', userUpdated);
    }

    console.log('--- -- -- -- -- -- -- -- -- -- --- ');
    console.log(`--- username: '${username}' was exist!`);
    console.log('--- -- -- -- -- -- -- -- -- -- --- ');

    return false;
  }
}

module.exports = saveUsername;
