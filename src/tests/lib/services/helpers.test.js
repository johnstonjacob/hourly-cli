const { expect } = require('chai'); // eslint-disable-line

const { minutesToHHMM, hhmmToMs, validHHMM } = require('../../../lib/services/helpers');

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
    expect(minutesToHHMM(602)).to.equal('10:02');
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

describe('validHHMM', () => {
  const validParams = ['3:30', '03:30', '3:03', '23:30', '23:03'];
  const invalidParams = ['233:34', ':30'];

  it('should be a function', () => {
    expect(validHHMM).to.be.a('function');
  });

  it('should return a boolean', () => {
    expect(validHHMM('03:30')).to.be.a('boolean');
  });

  it('should return true for valid HH:MM arguements', () => {
    const paramTest = (x) => expect(validHHMM(x)).to.equal(true);
    validParams.forEach(paramTest);
  });

  it('should return false for invalid HH:MM arguements', () => {
    const paramTest = (x) => expect(validHHMM(x)).to.equal(false);
    invalidParams.forEach(paramTest);
  });
});

describe('hhmsToMs', () => {
  it('should be a function', () => {
    expect(hhmmToMs).to.be.a('function');
  });

  it('should return a number ', () => {
    expect(hhmmToMs('09:30')).to.be.a('number');
  });

  it('should return the number of milliseconds from a passed in HH:MM', () => {
    expect(hhmmToMs('3:30')).to.equal(12600000);
    expect(hhmmToMs('8:30')).to.equal(30600000);
    expect(hhmmToMs('4:15')).to.equal(15300000);
  });
});
