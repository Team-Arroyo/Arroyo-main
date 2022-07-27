import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import moment from 'moment';
import PropTypes from 'prop-types';
import { formatDate } from '../libs/utils.js';
import { setStartDate, setEndDate } from '../features/dateRangeSlice.js';

function DatePicker({ dateType }) {
  const dispatch = useDispatch();
  const toggleDateType = dateType === 'Start Date' ? 'start' : 'end';
  const action = toggleDateType === 'start' ? setStartDate : setEndDate;
  const [selectedDate, setSelectedDate] = useState(moment());

  return (
    <EuiFormRow label={dateType}>
      <EuiDatePicker
        selected={selectedDate}
        onChange={(d) => {
          setSelectedDate(d);
          dispatch(action(formatDate(d)));
        }}
      />
    </EuiFormRow>
  );
}

DatePicker.defaultProps = {
  dateType: 'Enter A Date',
};

DatePicker.propTypes = {
  dateType: PropTypes.string,
};

export default DatePicker;
