import React from 'react';
import {
  EuiFlexGroup,
  EuiFormRow,
  EuiFlexItem,
} from '@elastic/eui';
import { isValidDateRange } from '../libs/utils';
import DatePicker from './DatePicker';

function DateRange() {
  const errors = ['Start Date must be before End Date'];

  return (
    <EuiFormRow isInvalid={!(isValidDateRange())} error={errors}>
      <EuiFlexGroup>
        <EuiFlexItem>
          <DatePicker
            dateType="start date"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <DatePicker
            dateType="end date"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default DateRange;
