const request = require('request-promise');
const AWS = require('aws-sdk');

const list = [
  'urban-light-at-lacma-los-angeles',
  'the-museum-of-contemporary-art-los-angeles',
  'the-last-bookstore-los-angeles',
  'rotunda-bar-and-lounge-london',
  'andina-london',
  'beigel-shop-london',
  'the-breakfast-club-london-2',
  'pimlico-fresh-london',
  'regency-café-london-2',
  'chriskitch-london'
];

function deployScraper(businessName) {
  const lambda = new AWS.Lambda({
    region: 'eu-west-2'
  });

  const params = {
    FunctionName: 'yelp-scraper-dev-scrape',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(businessName)
  };

  return lambda.invoke(params, function(error, data) {
    if (error) {
      console.error(JSON.stringify(error));
      return new Error(`Error scraping: ${JSON.stringify(error)}`);
    } else if (data) {
      console.log(data);
      return JSON.stringify(data);
    }
  });
}

function swarm(arr) {
  arr.forEach(businessName => {
    deployScraper(businessName);
  });
}

swarm(list);
