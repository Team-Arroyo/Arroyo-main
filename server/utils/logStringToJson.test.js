import { logStringToJson } from './logStringToJson.mjs';

describe('Converts log string to JSON', () => {
  const testObj = {"key": "ip", "value": "0.0.0.0"}
  const inputString = [JSON.stringify(testObj), ''].join('\n');
  test('returns a valid JSON object', () => {
    expect(logStringToJson(inputString)).toStrictEqual([testObj]);
  })
})