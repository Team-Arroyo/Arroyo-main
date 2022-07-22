import React from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiForm,
  EuiPanel,
} from '@elastic/eui';
import DateRange from './DateRange';
import IngestByQueryButton from './IngestByQueryButton';
import QueryTerms from './QueryTerms';
import QueryBadges from './QueryBadges';

function ByQueryTab() {
  return (
    <div>
      <EuiPanel paddingSize="m">
        <EuiTitle size="s"><h2>Filter</h2></EuiTitle>
        <EuiSpacer size="m" />
        <EuiText><p>Select a Date Range</p></EuiText>
        <EuiSpacer size="s" />
        <EuiForm>
          <DateRange />
        </EuiForm>
        <EuiSpacer size="m" />
        <QueryTerms />
        <EuiSpacer size="m" />

        <QueryBadges />
        <EuiSpacer size="xl" />

        <IngestByQueryButton />
      </EuiPanel>
    </div>
  );
}

export default ByQueryTab;
