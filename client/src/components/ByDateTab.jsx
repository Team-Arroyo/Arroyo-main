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
        <EuiTitle size="s"><h2>Filter by Date</h2></EuiTitle>
        <EuiText size="s"><p><i>Ingest whole log files</i></p></EuiText>
        <EuiSpacer size="m" />
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
      <EuiSpacer size="m" />
    </div>
  );
}

export default ByDateTab;
