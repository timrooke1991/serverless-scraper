'use strict';
const { getPage, parsePage, saveRatingsToDB, deployScrapers } = require('./utils');

module.exports.scrape = async (event, context, callback) => {
  console.log('Function triggered', event);
  const name = event;
  const page = await getPage(name);
  const data = await parsePage(page);
  await saveRatingsToDB(data, name);

  await callback(null, {
    statusCode: 200,
    message: `${event} sucessfully scraped`
  }).catch(() => new Error(`Error scraping ${event}`));
};

module.exports.launch_scrapers = (event, context, callback) => {
  // list business names
  const fakeDatabaseResults = [
    'urban-light-at-lacma-los-angeles',
    'the-museum-of-contemporary-art-los-angeles',
    'the-last-bookstore-los-angeles'
  ];

  // launch launch a lambda for each business name
  fakeDatabaseResults.forEach(businessName => {
    deployScrapers(businessName);
  });
};

