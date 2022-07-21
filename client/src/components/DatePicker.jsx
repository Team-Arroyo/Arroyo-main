import React, { useState } from 'react';
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatDate } from '../libs/utils';
import { setStartDate, setEndDate } from '../features/dateRangeSlice';

function DatePicker({ dateType }) {
  const toggleDateType = dateType === 'start date' ? 'start' : 'end';
  const action = toggleDateType === 'start' ? setStartDate : setEndDate;
  const dispatch = useDispatch();

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

// moment().toString();
