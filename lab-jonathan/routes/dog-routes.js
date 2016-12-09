let storage = require('../lib/storage')

module.exports = (router, storage) => {
  router.get('/dogs', function(req, res) {
    storage.fetchItem('dogs')
      .then(dogs => {
        res.write(dogs)
        res.end()
      })
  })
  router.post('/dogs', function(req, res) {

  })
}


let response = require('../lib/response.js');
let Note = require('../model/note.js') //not suire what note is yet.

module.exports = function(router) {
  router.get('/api/note', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('note', req.url.query.id)
      .then( note => {
        response.sendJSON(res, 200, note);
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
      let note = new Note(req.body.name, req.body.content);
      storage.createItem('note', note);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(note));
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
