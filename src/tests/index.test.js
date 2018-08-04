const { expect } = require('chai'); // eslint-disable-line

describe('test', () => {
  describe('testing', () => {
    it('should do stuff', () => {
      expect('foo').to.be.a('string');
    });
  });
});
