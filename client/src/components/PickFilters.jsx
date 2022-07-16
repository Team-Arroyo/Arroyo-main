/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  EuiButton, EuiSpacer, EuiFlexGroup, EuiFlexItem,
} from '@elastic/eui';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import apiClient from '../libs/apiclient';

function PickFilters({ setChoices }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClick = () => {
    apiClient
      .getKeys()
      .then(
        (keys) => setChoices(keys),
      )
      .catch((e) => console.log(e));
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
          <EuiButton onClick={handleClick}>
            Search S3
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="xl" />
    </div>
  );
}

PickFilters.defaultProps = {
  setChoices: () => console.log('the real function wasn not passed down'),
};

PickFilters.propTypes = {
  setChoices: PropTypes.func,
};

export default PickFilters;
