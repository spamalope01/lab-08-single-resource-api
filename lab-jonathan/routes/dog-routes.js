let storage = require('../lib/storage');

// module.exports = (router, storage) => {
//   router.get('/dogs', function(req, res) {
//     storage.fetchItem('dogs')
//       .then(dogs => {
//         res.write(dogs);
//         res.end();
//       });
//   });
//   router.post('/dogs', function(req, res) {
//
//   });
// };


let response = require('../lib/response.js');
let Dog = require('../model/dogs.js');

module.exports = function(router) {
  router.get('/api/dog', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('dog', req.url.query.id)
      .then(dog => {
        response.sendJSON(res, 200, dog);
      })
      .catch(err => {
        response.sendText(res, 404, 'Not Found');
      });
      return;
    }
    response.sendText(res, 400, 'Bad Request');
  });

  router.post('/api/note', function(req, res) {
    try{
      let dog = new Dog(req.body.name, req.body.content);
      storage.createItem('dog', dog);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(dog));
      res.end();
    }
    catch(err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Bad Request');
      res.end();
    }
  });
};
