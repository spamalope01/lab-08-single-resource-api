let uuid = require('node-uuid');


//Simple Object Constructor with a unique ID property.
function Dog(name, toy) {
  this.name = name,
  this.toy = toy,
  this.id = uuid.v4(4);
}

module.exports = Dog;
