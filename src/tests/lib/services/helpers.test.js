const { expect } = require('chai'); // eslint-disable-line

const { minutesToHHMM } = require('../../../lib/services/helpers');

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
