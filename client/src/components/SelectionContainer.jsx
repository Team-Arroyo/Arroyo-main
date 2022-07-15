/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { EuiButton, EuiSpacer, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import moment from 'moment';
import Dropdown from './Dropdown';
import apiClient from '../libs/apiclient';
import DatePicker from './DatePicker';

function SelectionContainer() {
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState('');
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  useEffect(() => {
    apiClient.getKeys().then(
      (keys) => setChoices(keys),
    ).catch((e) => {
      console.log(e);
    });
  }, []);

  const handleSelection = (e) => {
    setChoice(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleClick = () => {
    if (choice === 'Select A Log') {
      console.log('Nothing was selected');
      return;
    }
    apiClient.getObject(choice)
      .then(
        (r) => console.log(r),
      );
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
      <EuiFlexGroup>
        <EuiFlexItem>
          <Dropdown choices={choices} onSelection={handleSelection} />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={handleClick}>Ingest Log</EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

export default SelectionContainer;
