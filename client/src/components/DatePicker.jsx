import React from 'react';
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { setStartDate, setEndDate } from '../features/dateRangeSlice';

function DatePicker({ dateType }) {
  const toggleDateType = dateType === 'start date' ? 'start' : 'end';
  const action = toggleDateType === 'start' ? setStartDate : setEndDate;
  const dispatch = useDispatch();
  const date = useSelector((state) => {
    const string = state.dateRange.find((d) => Object.keys(d).includes('start'));
    return moment(string);
  });
  return (
    <EuiFormRow label={dateType}>
      <EuiDatePicker
        selected={date}
        onChange={() => dispatch(action(date))}
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
