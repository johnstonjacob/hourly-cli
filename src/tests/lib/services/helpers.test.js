const { expect } = require('chai'); // eslint-disable-line

const { minutesToHHMM, hhmmToMs } = require('../../../lib/services/helpers');

describe('minutesToHHMM', () => {
  it('should be a function', () => {
    expect(minutesToHHMM).to.be.a('function');
  });

  it('should return a string', () => {
    expect(minutesToHHMM(60)).to.be.a('string');
  });

  it('should format numbers to HH:MM', () => {
    expect(minutesToHHMM(0)).to.equal('00:00');
    expect(minutesToHHMM(60)).to.equal('01:00');
    expect(minutesToHHMM(40)).to.equal('00:40');
    expect(minutesToHHMM(120)).to.equal('02:00');
    expect(minutesToHHMM(150)).to.equal('02:30');
    expect(minutesToHHMM(2578)).to.equal('42:58');
    expect(minutesToHHMM(12578)).to.equal('209:38');
  });

  it('should set negative numbers to 00:00', () => {
    expect(minutesToHHMM(-60)).to.equal('00:00');
    expect(minutesToHHMM(-1)).to.equal('00:00');
    expect(minutesToHHMM(0)).to.equal('00:00');
  });
});

describe('hhmsToMs', () => {
  it('should be a function', () => {
    expect(hhmmToMs).to.be.a('function');
  });

  it('should return an object', () => {
    expect(hhmmToMs()).to.be.a('object');
    expect(hhmmToMs('09:30')).to.be.a('object');
  });

  it('should return an object with an ok property', () => {
    expect(hhmmToMs()).to.be.a('object').with.property('ok');
    expect(hhmmToMs('09:30')).to.be.a('object').with.property('ok');
  });

  it('should return ok: false when passed an invald param', () => {
    const invalidParams = ['03:300', '0330', true, '03:61', 330, '003:30', '0:030', '33:25'];
    invalidParams.forEach((invalidParam) => {
      expect(hhmmToMs(invalidParam))
        .to.be.a('object')
        .with.property('ok')
        .to.equal(false);
    });
  });

  it('should return ok: true when passed a valid param', () => {
    const validParams = ['03:30', '3:30', '13:30', '23:59'];
    validParams.forEach((validParam) => {
      expect(hhmmToMs(validParam))
        .to.be.a('object')
        .with.property('ok')
        .to.equal(true);
    });
  });
});
