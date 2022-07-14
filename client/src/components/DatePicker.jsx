import React from 'react';
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import PropTypes from 'prop-types';

function DatePicker({ dateType, dateStatus, handleChange }) {
  return (
    <EuiFormRow label={dateType}>
      <EuiDatePicker
        selected={dateStatus}
        onChange={handleChange}
        onClear={() => handleChange(null)}
      />
    </EuiFormRow>
  );
}

DatePicker.defaultProps = {
  dateType: 'Enter A Date',
  dateStatus: null,
  handleChange: null,

};

DatePicker.propTypes = {
  dateType: PropTypes.string,
  dateStatus: PropTypes.string,
  handleChange: PropTypes.func,
};

export default DatePicker;
