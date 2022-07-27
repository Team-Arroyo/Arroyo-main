import React from 'react';
import {
  EuiFlexGroup,
  EuiFormRow,
  EuiFlexItem,
} from '@elastic/eui';
import { isValidDateRange } from '../libs/utils.js';
import DatePicker from './DatePicker';

function DateRange() {
  const errors = ['Start Date must be before End Date'];

  return (
    <EuiFormRow isInvalid={!(isValidDateRange())} error={errors}>
      <EuiFlexGroup>
        <EuiFlexItem>
          <DatePicker
            dateType="Start Date"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <DatePicker
            dateType="End Date"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default DateRange;
