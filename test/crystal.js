describe('crystal', function () {
  it('should have default options', function () {
    var gen = crystal();
    gen.should.have.property('_bits').a('number');
    gen.should.have.property('_base').a('number');
    gen.should.have.property('_grow').a('number');
  });

  it('should allow for custom options', function () {
    var gen = crystal({ bits: 64, base: 8, grow: 12 });
    gen.should.have.property('_bits', 64);
    gen.should.have.property('_base', 8);
    gen.should.have.property('_grow', 12);
  });

  describe('.random()', function () {
    it('should return a string', function () {
      var gen = crystal();
      gen.random().should.be.a('string');
    });
  });

  describe('.claim()', function () {
    it('should return a string', function () {
      var gen = crystal();
      gen.claim().should.be.a('string');
    });

    it('should allow for custom claims', function () {
      var gen = crystal();
      gen.claim('test').should.equal('test');
      gen.has('test').should.be.true;
    });

    it('should error if claiming a duplicate id', function (){
      var gen = crystal()
        , id = gen.claim();
      gen.has(id).should.be.true;
      (function () {
        gen.claim(id);
      }).should.throw();
    });
  });
});
