const { expect } = require('chai'); // eslint-disable-line

const {
  Billable, isCurrentBillable, startBillable, stopBillable,
} = require('../../../lib/services/db');

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

describe('stopBillable', () => {
  beforeEach(async () => {
    await Billable.destroy({ where: {}, truncate: false });
  });

  after(async () => {
    await Billable.destroy({ where: {}, truncate: false });
  });

  it('should be a function', () => {
    expect(stopBillable).to.be.a('function');
  });

  it('should return an object', async () => {
    const billable = await Billable.create({ startTime: Date.now() });
    expect(await stopBillable(billable.get('id'))).to.be.a('object');
  });

  it('should return an object with an "ok property"', async () => {
    const billable = await Billable.create({ startTime: Date.now() });
    expect(await stopBillable(billable.get('id'))).to.have.property('ok');
  });

  it('should add an endTime column to the DB entry', async () => {
    const billable = await Billable.create({ startTime: Date.now() });
    await stopBillable(billable.get('id'));
    const row = await Billable.find({ where: undefined });
    expect(row.get('endTime')).to.not.equal(undefined);
  });

  it('should set endTime to equal the current time', async () => {
    const billable = await Billable.create({ startTime: Date.now() });
    const time = Date.now();
    await stopBillable(billable.get('id'), time);
    const row = await Billable.find({ where: undefined });
    expect(row.get('endTime')).to.equal(time);
  });


  it('should add a totalTime column to the DB entry', async () => {
    const billable = await Billable.create({ startTime: Date.now() });
    await stopBillable(billable.get('id'));
    const row = await Billable.find({ where: undefined });
    expect(row.get('totalTime')).to.not.equal(undefined);
  });

  it('should set totalTime to equal endTime - startTime', async () => {
    const endTime = Date.now();
    const startTime = endTime - 5000;
    const billable = await Billable.create({ startTime });

    await stopBillable(billable.get('id'), endTime);
    const row = await Billable.find({ where: undefined });

    expect(row.get('totalTime')).to.equal(endTime - startTime);
  });
});
