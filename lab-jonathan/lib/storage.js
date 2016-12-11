let storage = {};
let blueBird = require('bluebird');
let fs = blueBird.promisifyAll(require('fs'), { suffix: 'Prom'});


storage.createItem = function(schemaName, item){
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
};

storage.fetchItem = function(item){
  return fs.readFileProm(`${__dirname}/../data/data.json`)
    .then(data => {
      let item = JSON.parse(data.toString());
      return item;
    })
    .catch(err => Promise.reject(err));
};
