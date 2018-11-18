const rp = require('request-promise');

module.exports = businessName => {
  // https://www.yelp.com/biz/the-last-bookstore-los-angeles
  console.log('Fetching...');
  const url = `https://www.yelp.com/biz/${businessName}`;
  return rp({
    method: 'GET',
    url: url
  });
};
