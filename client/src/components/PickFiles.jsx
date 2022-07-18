/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  EuiButton, EuiFlexGroup, EuiFlexItem,
} from '@elastic/eui';
import apiClient from '../libs/apiclient';
import Dropdown from './Dropdown';

function PickFiles() {
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
    <EuiFlexGroup>
      <EuiFlexItem>
        <Dropdown choices={choices} onSelection={handleSelection} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiButton onClick={handleClick}>Ingest Log</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default PickFiles;
