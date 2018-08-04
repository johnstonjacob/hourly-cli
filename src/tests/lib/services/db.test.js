const { expect } = require('chai'); // eslint-disable-line

const { Billable, isCurrentBillable, startBillable } = require('../../../lib/services/db');

describe('isCurrentBillable', () => {
  beforeEach(async () => {
    await Billable.destroy({ where: {}, truncate: false });
  });

  after(async () => {
    await Billable.destroy({ where: {}, truncate: false });
  });

  it('should be a function', () => {
    expect(isCurrentBillable).to.be.a('function');
  });

  it('should return an object', async () => {
    expect(await isCurrentBillable()).to.be.a('object');
  });

  it('should return an object with an "ok" property', async () => {
    expect(await isCurrentBillable()).to.have.property('ok');
    await Billable.create({ startTime: Date.now() });
    expect(await isCurrentBillable()).to.have.property('ok');
  });

  it('should return an object with an id property if there is a row', async () => {
    await Billable.create({ startTime: Date.now() });
    expect(await isCurrentBillable()).to.have.property('id');
  });

  it('should return an object with a startTime property if there is a row', async () => {
    await Billable.create({ startTime: Date.now() });
    expect(await isCurrentBillable()).to.have.property('startTime');
  });
});

describe('startBillable', () => {
  beforeEach(async () => {
    await Billable.destroy({ where: {}, truncate: false });
  });

  after(async () => {
    await Billable.destroy({ where: {}, truncate: false });
  });

  it('should be a function', () => {
    expect(startBillable).to.be.a('function');
  });

  it('should be return an object', async () => {
    expect(await startBillable()).to.be.a('object');
  });

  it('should return an object with an "ok" property', async () => {
    expect(await startBillable()).to.have.property('ok');
  });

  it('should create a row in the DB', async () => {
    await startBillable();
    expect(await Billable.count({ where: undefined })).to.equal(1);
  });
});
