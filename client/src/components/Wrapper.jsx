import React, { useState } from 'react';
import PickFiles from './PickFiles';
import PickFilters from './PickFilters';

function Wrapper() {
  const [choices, setChoices] = useState([]);

  return (
    <>
      <PickFilters setChoices={setChoices} />
      <PickFiles choices={choices} />
    </>
  );
}

export default Wrapper;
