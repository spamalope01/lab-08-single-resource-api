//way to associate callbacks with that combination VERB/route.
module.exports = Router;
function Router() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  }
}

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback
}

Router.prototype.get = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback
}

Router.prototype.get = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback
}

Router.prototype.get = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback
}

Router.prototype.route = function() {
  return function (req, res){
    Promise.all([
      parseURL(req),
      parseJSON(req),
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }

      console.error('route not found');
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('not found');
      res.end();

    })
    .catch( err => {
      // if parse body fails log error to server and respond 400 to user
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
  };
};