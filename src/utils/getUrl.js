const UserUrl = require('../models/userUrl');

function convertUrlBaseNewSort(originalUrl) {
  try {
    // Create a URL object from the original URL
    const url = new URL(originalUrl);

    // Extract the path from the URL
    const path = url.pathname.split('/');

    // Check if the path matches the expected pattern
    if (path.length === 3 && path[1] === 'search') {
      // Extract the query term
      const queryTerm = path[2];

      // Construct the new URL
      const newUrl = new URL('https://dribbble.com/search/shots/recent');
      newUrl.searchParams.set('q', queryTerm);

      return newUrl.toString();
    } else {
      throw new Error('URL does not match the expected pattern.');
    }
  } catch (error) {
    console.error('Error converting URL:', error.message);
    return null;
  }
}

async function getUrl() {
  // Find the UserUrl with the lowest count
  const lowestCountUrl = await UserUrl.findOne().sort({ count: 1 });

  if (lowestCountUrl) {
    // Increment the count of the URL
    lowestCountUrl.count += 1;
    await lowestCountUrl.save();

    console.log(`Returning URL: ${lowestCountUrl.url} with updated count: ${lowestCountUrl.count}`);

    return convertUrlBaseNewSort(lowestCountUrl.url);
  }

  console.log('No URLs found to update.');
  return null;
}

module.exports = getUrl;
