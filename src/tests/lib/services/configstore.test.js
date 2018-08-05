const expect = require('chai').expect; // eslint-disable-line
const Configstore = require('configstore');
const { configSetup } = require('../../../lib/services/configstore');

const config = new Configstore('hourly-cli.test');

describe('configSetup', () => {
  after(() => {
    config.clear();
  });

  it('should be a function', () => {
    expect(configSetup).to.be.a('function');
  });

  it('should return an object', () => {
    expect(configSetup()).to.be.a('object');
  });

  it('should return an object with a package-mode property', () => {
    expect(configSetup()).to.be.a('object').with.property('packageMode');
  });

  it('should set package-mode property to false if undefined', () => {
    config.clear();
    configSetup();
    expect(config.get('package-mode')).to.equal(false);
  });

  it('should return package-mode property to false if config is set as such', () => {
    config.set('package-mode', false);
    configSetup();
    expect(config.get('package-mode')).to.equal(false);
  });

  it('should return package-mode property to true if config is set as such', () => {
    config.set('package-mode', true);
    configSetup();
    expect(config.get('package-mode')).to.equal(true);
  });
});
