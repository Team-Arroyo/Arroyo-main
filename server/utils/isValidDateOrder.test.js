import { EC2UnexpectedException } from '@aws-sdk/client-lambda';
import isValidDateOrder from './isValidDateOrder.mjs';

describe('Determines if start date comes before end date', () => {
  const startDate = new Date(1999, 10, 10);
  const endDate = new Date(2000, 10, 10);

  test('returns false if start date is greater than end date', () => {
    expect(isValidDateOrder(endDate, startDate)).toBe(false);
  });
  test('returns true if start date is less than or equal than end date', () => {
    expect(isValidDateOrder(startDate, endDate)).toBe(true);
  });
});