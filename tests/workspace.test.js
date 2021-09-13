const { Workspace, MILLIS_TO_HOURS } = require('../src/core/workspace');
jest.spyOn(Date, 'now').mockReturnValue(54321);

describe('create workspace', () => {
  it('passing string', () => {
    const ws = new Workspace('test');
    expect(ws.name).toStrictEqual('test');
    expect(ws.clocks).toStrictEqual([]);
  });
  it('passing object', () => {
    const ws = new Workspace({
      name: 'test',
      clocks: [123]
    });
    expect(ws.name).toStrictEqual('test');
    expect(ws.clocks).toEqual([new Date(123)]);
  });
});
describe('time property', () => {
  it('no clocks', () => {
    const ws = new Workspace('test');
    expect(ws.time).toEqual(0);
  });
  it('clocked in', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    expect(ws.time).toEqual((Date.now() - 12345) * MILLIS_TO_HOURS);
  });
  it('clocked out', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    ws.clock();
    expect(ws.time).toEqual((Date.now() - 12345) * MILLIS_TO_HOURS);
  });
});
describe('cycleTime property', () => {
  it('no clocks', () => {
    const ws = new Workspace('test');
    expect(ws.cycleTime).toEqual(0);
  });
  it('clocked in', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    expect(ws.cycleTime).toEqual((Date.now() - 12345) * MILLIS_TO_HOURS);
  });
  it('clocked out', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    ws.clock();
    expect(ws.cycleTime).toEqual(0);
  });
});
describe('clocking in/out', () => {
  it('clocks in now', () => {
    const ws = new Workspace('test');
    ws.clock();
    expect(ws.clocks[0]).toEqual(new Date(54321));
  });
  it('clocks in at specific time', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    expect(ws.clocks[0]).toEqual(new Date(12345));
  });
  it('passing in a number', () => {
    const ws = new Workspace('test');
    ws.clock(12345);
    expect(ws.clocks[0]).toEqual(new Date(12345));
  });
  it('passing in a string', () => {
    const ws = new Workspace('test');
    ws.clock('01/01/01 01:01');
    expect(ws.clocks[0]).toEqual(new Date('01/01/01 01:01'));
  });
  it('passing a invalid string', () => {
    const ws = new Workspace('test');
    ws.clock('hello world');
    expect(ws.clocks.length).toEqual(0);
  });
  it('clocks out', () => {
    const ws = new Workspace('test');

    ws.clock(new Date(12345));
    ws.clock();
    expect(ws.clocks[0]).toEqual(new Date(12345));
    expect(ws.clocks[1]).toEqual(new Date(54321));
  });
});
describe('unclock property', () => {
  it('no index', () => {
    const ws = new Workspace('test');
    ws.clock(12345);
    ws.clock(54321);
    ws.clock(67899);
    ws.unclock();

    expect(ws.clocks).toEqual([new Date(12345), new Date(54321)]);
  });
  it('second index', () => {
    const ws = new Workspace('test');
    ws.clock(12345);
    ws.clock(54321);
    ws.clock(67899);
    ws.unclock(1);

    expect(ws.clocks).toEqual([new Date(12345), new Date(67899)]);
  });
});