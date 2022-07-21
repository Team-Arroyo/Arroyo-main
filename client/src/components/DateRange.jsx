import React from 'react';
import {
  EuiFlexGroup,
  EuiFormRow,
  EuiFlexItem,
} from '@elastic/eui';
import DatePicker from './DatePicker';

function DateRange() {
  return (
    <EuiFormRow>
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
