const expect = require('chai').expect; // eslint-disable-line
const Configstore = require('configstore');
const { configSetup } = require('../../../lib/services/configstore');
const { configTestPath } = require('../../../lib/constants.json');

const config = new Configstore(configTestPath);

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

  it('should return an object with a project-mode property', () => {
    expect(configSetup()).to.contain.property('projectMode');
  });

  it('should set project-mode property to false if undefined', () => {
    config.clear();
    configSetup();
    expect(config.get('project-mode')).to.equal(false);
  });

  it('should return project-mode property to false if config is set as such', () => {
    config.set('project-mode', false);
    configSetup();
    expect(config.get('project-mode')).to.equal(false);
  });

  it('should return project-mode property to true if config is set as such', () => {
    config.set('project-mode', true);
    configSetup();
    expect(config.get('project-mode')).to.equal(true);
  });

  it('should return a firstRun property', () => {
    expect(configSetup()).to.contain.property('firstRun');
  });

  it('should return firstRun as true if no config was set before', () => {
    config.clear();
    expect(configSetup()).to.contain.property('firstRun').to.equal(true);
  });

  it('should return firstRun as false if a config was set before', () => {
    expect(configSetup()).to.contain.property('firstRun').to.equal(false);
  });
});
