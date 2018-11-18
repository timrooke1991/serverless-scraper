const cheerio = require('cheerio');

module.exports = page => {
  // https://www.yelp.com/biz/the-last-bookstore-los-angeles
  console.log('Parsing...');
  try {
    const $ = cheerio.load(page);
    console.log('loaded');
    const rating = $('.rating-info .i-stars')
      .attr('title')
      .trim()
      .split(' ')[0];
    const reviewCount = $('.rating-info .review-count')
      .text()
      .trim()
      .split(' ')[0];
    console.log(rating);
    console.log(reviewCount);
    const yelpData = { rating, reviewCount };
    console.log(yelpData);
    return Promise.resolve(yelpData);
  } catch (error) {
    return Promise.reject(`Error parsing page: ${JSON.stringify(error)}`);
  }
};
