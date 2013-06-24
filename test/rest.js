/**
 * REST API Tests
 */

function json(verb, url) {
  return request(app)
  [verb](url)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
}

describe('REST', function(){
  /**
   * Expected Input Tests
   */
  
  describe('Expected Usage', function(){
    
    describe('GET /weapons', function(){
      it('should return a list of all weapons', function(done) {
        json('get', '/weapons')
          .expect(200)
          .end(function (err, res) {
            assert(Array.isArray(res.body));
            assert.equal(res.body.length, testData.weapons.length);

            done();
          });
      });
    });
    
    describe('POST /weapons', function(){
      it('should create a new weapon', function(done) {
        json('post', '/weapons')
          .send({data: {
            "title": "M1911-2",
            "audibleRange": 52.8,
            "effectiveRange": 50,
            "rounds": 7,
            "fireModes": "Single"
          }})
          .expect(200)
          .end(function (err, res) {
            assert(typeof res.body === 'object');
            assert(res.body.id, 'must have an id');
            done();
          });
      });
    });
    
    describe('PUT /weapons/:id', function(){
      it('should update a weapon with the given id', function(done) {
        json('get', '/weapons/1')
          .expect(200, function (err, res) {
            var weapon = res.body;
            assert.equal(weapon.id, 1);
            assert.equal(weapon.audibleRange, 52.8);
            json('put', '/weapons/1')
              .send({data: {audibleRange: 999}})
              .expect(200, function (err, res) {
                var updatedWeapon = res.body;
                assert.equal(updatedWeapon.id, 1);
                assert.equal(updatedWeapon.audibleRange, 999);
                done();
              });
          });
      });
    });
  });
  
  describe('Unexpected Usage', function(){
    describe('POST /weapons/:id', function(){
      it('should not crash the server when posting a bad id', function(done) {
        json('post', '/weapons/foobar').send({}).expect(404, done);
      });
    });
  });

});