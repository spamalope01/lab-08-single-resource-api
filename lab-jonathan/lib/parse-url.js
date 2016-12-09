let parseURL = require('url');
let parseQuery = require('querystring');

module.exports = function(req){
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
