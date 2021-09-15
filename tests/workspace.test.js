const { Workspace, MILLIS_TO_HOURS, Cycle } = require('../src/core');
jest.spyOn(Date, 'now').mockReturnValue(54321);

describe('create workspace', () => {
  test('passing string', () => {
    const ws = new Workspace('test');
    expect(ws.name).toStrictEqual('test');
    expect(ws.clocks).toStrictEqual([]);
  });
  test('passing object', () => {
    const ws = new Workspace({
      name: 'test',
      clocks: [123]
    });
    expect(ws.name).toStrictEqual('test');
    expect(ws.clocks).toEqual([new Date(123)]);
  });
});
describe('clocking in/out', () => {
  test('clocks in now', () => {
    const ws = new Workspace('test');
    ws.clock();
    expect(ws.clocks[0]).toEqual(new Date(54321));
  });
  test('clocks in at specific time', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    expect(ws.clocks[0]).toEqual(new Date(12345));
  });
  test('passing in a number', () => {
    const ws = new Workspace('test');
    ws.clock(12345);
    expect(ws.clocks[0]).toEqual(new Date(12345));
  });
  test('passing in a string', () => {
    const ws = new Workspace('test');
    ws.clock('01/01/01 01:01');
    expect(ws.clocks[0]).toEqual(new Date('01/01/01 01:01'));
  });
  test('passing a invalid string', () => {
    const ws = new Workspace('test');
    ws.clock('hello world');
    expect(ws.clocks.length).toEqual(0);
  });
  test('clocks out', () => {
    const ws = new Workspace('test');

    ws.clock(new Date(12345));
    ws.clock();
    expect(ws.clocks[0]).toEqual(new Date(12345));
    expect(ws.clocks[1]).toEqual(new Date(54321));
  });
});
describe('unclock function', () => {
  test('no index', () => {
    const ws = new Workspace('test');
    ws.clock(12345);
    ws.clock(54321);
    ws.clock(67899);
    ws.unclock();

    expect(ws.clocks).toEqual([new Date(12345), new Date(54321)]);
  });
  test('second index', () => {
    const ws = new Workspace('test');
    ws.clock(12345);
    ws.clock(54321);
    ws.clock(67899);
    ws.unclock(1);

    expect(ws.clocks).toEqual([new Date(12345), new Date(67899)]);
  });
});
describe('time property', () => {
  test('no clocks', () => {
    const ws = new Workspace('test');
    expect(ws.time).toEqual(0);
  });
  test('clocked in', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    expect(ws.time).toEqual((Date.now() - 12345) * MILLIS_TO_HOURS);
  });
  test('clocked out', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    ws.clock();
    expect(ws.time).toEqual((Date.now() - 12345) * MILLIS_TO_HOURS);
  });
});
describe('cycleTime property', () => {
  test('no clocks', () => {
    const ws = new Workspace('test');
    expect(ws.cycleTime).toEqual(0);
  });
  test('clocked in', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    expect(ws.cycleTime).toEqual((Date.now() - 12345) * MILLIS_TO_HOURS);
  });
  test('clocked out', () => {
    const ws = new Workspace('test');
    ws.clock(new Date(12345));
    ws.clock();
    expect(ws.cycleTime).toEqual(0);
  });
});
describe('cycles property', () => {
  const cases = [
    [[], []],
    [[new Date(100)], [new Cycle(new Date(100))]],
    [[new Date(100), new Date(200)], [new Cycle(new Date(100), new Date(200))]],
    [[new Date(200), new Date(100)], [new Cycle(new Date(100), new Date(200))]],
    [[new Date(100), new Date(200), undefined], [new Cycle(new Date(100), new Date(200)), new Cycle(new Date(Date.now()))]]
  ];
  test.each(cases)('%p clocks should output %p cycles', (clocks, cycles) => {
    const ws = new Workspace('test');
    clocks.forEach(c => {
      ws.clock(c);
    });
    expect(ws.cycles).toEqual(cycles);
  });
});