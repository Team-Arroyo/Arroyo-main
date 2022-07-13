/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { EuiButton } from '@elastic/eui';
import Dropdown from './Dropdown';
import apiClient from '../libs/apiclient';
import DatePicker from './DatePicker';

function SelectionContainer() {
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState('');

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
      <DatePicker />
      <Dropdown choices={choices} onSelection={handleSelection} />
      <p />
      <EuiButton onClick={handleClick}>Ingest Log</EuiButton>
    </div>
  );
}

export default SelectionContainer;
