const { Cycle, MILLIS_TO_HOURS } = require('../src/core');
jest.spyOn(Date, 'now').mockReturnValue(54321);

describe('duration', () => {
  const cases = [
    [new Date(100), new Date(300), (300 - 100) * MILLIS_TO_HOURS], 
    [new Date(300), new Date(100), (300 - 100) * MILLIS_TO_HOURS],
    [new Date(100), new Date(100), 0],
    [new Date(50321), undefined, 4000 * MILLIS_TO_HOURS]
  ];
  test.each(cases)('Cycle (%p, %p)\'s duration should be %p hours', (_in, out, result) => {
    const cyc = new Cycle(_in, out);
    expect(cyc.duration).toEqual(result);
  });
});
describe('includes', () => {
  const cases = [
    [new Date(100), new Date(300), new Date(200), true],
    [new Date(100), new Date(300), new Date(50), false],
    [new Date(100), new Date(300), new Date(400), false],
    [new Date(100), undefined, new Date(250), true],
    [new Date(100), undefined, new Date(60000), false]
  ];
  test.each(cases)('Cycle (%p, %p) contains %p? %p', (_in, out, time, result) => {
    expect(new Cycle(_in, out).includes(time)).toEqual(result);
  });
});