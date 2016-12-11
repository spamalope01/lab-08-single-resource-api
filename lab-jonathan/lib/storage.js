let storage = {};
let bluebird = require('bluebird');
let fs = bluebird.promisifyAll(require('fs'), { suffix: 'Prom'});


storage.createItem = function(item){
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${item.id}.json`, json)
    .then(() => item)
    .catch( err => bluebird.reject(err));
};

storage.fetchItem = function(id){
  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
    .then(data => {
      try {
        let item = JSON.parse(data.toString());
        return item;
      } catch(err){
        return bluebird.reject(err);
      }
    })
    .catch(err => bluebird.reject(err));
};

storage.deleteItem = function(item){
  return fs.unlinkProm(`${__dirname}/../data/${item.id}`)
    .then(() => item)
    .catch(err => bluebird.reject(err));
};

module.exports = storage;
