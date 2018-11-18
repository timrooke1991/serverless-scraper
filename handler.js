'use strict';
const { getPage, parsePage, saveRatingsToDB } = require('./utils');

module.exports.scrape = async (event, context, callback) => {
  console.log('Function triggered', event);
  const name = event;
  const page = await getPage(name);
  const data = await parsePage(page);
  await saveRatingsToDB(data, name, context);

  await callback(null, {
    statusCode: 200,
    message: `${event} sucessfully scraped`
  }).catch(() => new Error(`Error scraping ${event}`));
};
