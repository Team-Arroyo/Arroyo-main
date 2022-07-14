import React, { useState } from 'react';
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import moment from 'moment';

function DatePicker() {
  const [startDate, setStartDate] = useState(moment());
  const handleChange = (date) => {
    setStartDate(date);
  };

  return (
    <EuiFormRow label="Select a date">
      <EuiDatePicker selected={startDate} onChange={handleChange} />
    </EuiFormRow>
  );
}

export default DatePicker;
