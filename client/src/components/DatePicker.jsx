import React, { useState } from 'react';
import { EuiDatePicker, EuiDatePickerRange } from '@elastic/eui';
import moment from 'moment';
// @ts-ignore Importing from JS
import { DisplayToggles } from '../libs/display_toggles';

function DatePicker() {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, 'd'));

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canCompressed={false} canLoading={false}>
      <EuiDatePickerRange
        isInvalid={startDate > endDate}
        startDateControl={(
          <EuiDatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
            aria-label="Start date"
            showTimeSelect
          />
        )}
        endDateControl={(
          <EuiDatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            startDate={startDate}
            endDate={endDate}
            aria-label="End date"
            showTimeSelect
          />
        )}
      />
    </DisplayToggles>
  );
}

export default DatePicker;
