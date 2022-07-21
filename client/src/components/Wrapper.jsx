import React from 'react';
import { EuiPanel, EuiSpacer } from '@elastic/eui';
import PickFiles from './PickFiles';
import PickFilters from './PickFilters';

function Wrapper() {
  return (
    <>
      <EuiPanel paddingSize="l">
        <PickFilters />
      </EuiPanel>
      <EuiSpacer size="xl" />
      <EuiPanel paddingSize="l">
        <PickFiles />
      </EuiPanel>
    </>
  );
}

export default Wrapper;
