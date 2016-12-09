require('fetch')
let expect = require('chai').expect
require('../index.js')

describe('a restful endpoint', function(){
  it('can give a list of dogs', function(done){
    fetch('http://localhost:3000/dogs')
      .then(res => data.json())
      .then(data => {
        expect(res.status).to.equal(200)
        expect(res.body.dogs.length).to.equal(4)
        //inspect everything about this property you want to
        done()
      })
  })
  //another it to test, if you have, say, cats.
  //expect(res.body.cats[0].name).to.equal('zack')
});

describe('testing GET /api/dogs', function(){
  it('should return a dog', function(done){
    request.get(`localhost:3000/api/dogs?id=${dog.id}`)
    .end((err, res) => {
      if(err) return done(err);
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('hello'); //or something relating to the dog
      expect(res.body.content).to.equal('goodbye'); //or something realting to the dog
      done();
    });
  });
});
