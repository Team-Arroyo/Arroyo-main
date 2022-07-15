/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  EuiButton, EuiSpacer, EuiFlexGroup, EuiFlexItem,
} from '@elastic/eui';
import moment from 'moment';
import DatePicker from './DatePicker';

function PickFilters() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <EuiFlexGroup>
        <EuiFlexItem>
          <DatePicker dateType="start date" dateStatus={startDate} handleChange={handleStartDateChange} />
        </EuiFlexItem>
        <EuiFlexItem>
          <DatePicker dateType="end date" dateStatus={endDate} handleChange={handleEndDateChange} />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={() => console.log(`posting ${startDate} and ${endDate} to backend API`)}>
            Search S3
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
    </div>
  );
}

export default PickFilters;
