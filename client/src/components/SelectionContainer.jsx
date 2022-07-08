/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

import apiClient from '../libs/apiclient';

function SelectionContainer() {
  const [choices, setChoices] = useState([]);
  const [choice, setChoice] = useState('');

  useEffect(() => {
    apiClient.getKeys().then(
      (keys) => setChoices(keys),
    );
  }, []);

  const handleSelection = (e) => {
    setChoice(e.target.value);
  };

  const handleClick = () => {
    if (choice === 'Select A Log') {
      console.log('not sending anything ty');
      return;
    }
    apiClient.getObject(choice)
      .then(
        (r) => console.log(r),
      );
  };

  return (
    <>
      <Dropdown choices={choices} onSelection={handleSelection} />
      <p />
      <button type="button" onClick={handleClick}>Get Log</button>
    </>
  );
}

export default SelectionContainer;
