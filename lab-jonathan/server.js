
//
// Create a body parser to parse the json in the body of POST and PUT requests
// Create a url parser that uses nodes url and querystring modules parse the request url
// Create a route for doing CREATE, READ, and DELETE operations on your simple resource
// Create a storage module that will store resources by their type and id


let http = require('http');
let id = require('node-uuid');
let urlParse = require('./url.js')
let router = require('./router.js');
let PORT = process.env.PORT || 3000;

//Simple Object Constructor with a unique ID property.
function Dog(name, toy) {
  this.name = name,
  this.toy = toy,
  this.id = id.v4();
}

let server = http.createServer();

server.listen(3000, function(){
  console.log('server is up, listening on: ', PORT);
});


// require http
// require router //let Router = require(./lib/router.js)
//
// then PORT
// let router = new Router();
//
// require('./route/dog-route.js')(router);
//
// create server // let server = http.createServer(router.route());
//
// then server listen
