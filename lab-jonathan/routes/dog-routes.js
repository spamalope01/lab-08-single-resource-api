let storage = require('../lib/storage.js');
let response = require('../lib/response.js');
let Dog = require('../model/dogs.js');


module.exports = function(router) {
  router.get('/api/dogs', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem(req.url.query.id)
      .then(dog => {
        console.log('then dog', dog);
        response.sendJSON(res, 200, dog);
      })
      .catch(err => {
        response.sendText(res, 404, 'Not Found');
      });
      return;
    }
    response.sendText(res, 400, 'Bad Request');
  });

  router.post('/api/dogs', function(req, res) {
    try{
      let pup = new Dog(req.body.name, req.body.toy);
      storage.createItem('dog', pup);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(pup));
      res.end();
    }
    catch(err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Bad Request, motherfucker');
      res.end();
    }
  });
  //
  // router.delete('/api/dogs', function(req, res){
  //   if(req.url.query.id) {
  //     storage.fetchItem('dog', req.url.query.id)
  //     .then(dog => {
  //       response.sendJSON(res, 200, dog);
  //     })
  //     .catch(err => {
  //       response.sendText(res, 404, 'Not Found');
  //     });
  //     return;
  //   }
  //   response.sendText(res, 400, 'Bad Request, honkey');
  // })
};
