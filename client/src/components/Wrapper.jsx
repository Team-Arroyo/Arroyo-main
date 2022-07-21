import React, { useState } from 'react';
import { EuiPanel, EuiSpacer } from '@elastic/eui';
import PickFiles from './PickFiles';
import PickFilters from './PickFilters';

function Wrapper() {
  const [choices, setChoices] = useState([]);

  return (
    <>
      <EuiPanel paddingSize="l">
        <PickFilters setChoices={setChoices} />
      </EuiPanel>
      <EuiSpacer size="xl" />
      <EuiPanel paddingSize="l">
        <PickFiles choices={choices} />
      </EuiPanel>
    </>
  );
}

export default Wrapper;
