import React from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiForm,
  EuiPanel,
} from '@elastic/eui';
import DateRange from './DateRange';
import PickFiles from './PickFiles';
import PickByDateButton from './PickByDateButton';

function ByDateTab() {
  return (
    <div>
      <EuiPanel>
        <EuiTitle size="s"><h2>Filter</h2></EuiTitle>
        <EuiSpacer size="m" />
        <EuiText><p>Select a Date Range</p></EuiText>
        <EuiSpacer size="s" />
        <EuiForm>
          <DateRange />
          <EuiSpacer size="xl" />
          <PickByDateButton />
        </EuiForm>
      </EuiPanel>
      <EuiSpacer size="m" />
      <EuiPanel>
        <PickFiles />
      </EuiPanel>
    </div>
  );
}

export default ByDateTab;
