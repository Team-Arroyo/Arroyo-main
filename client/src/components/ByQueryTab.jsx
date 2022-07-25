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
        <EuiTitle size="s"><h2>Filter by Search</h2></EuiTitle>
        <EuiText size="s"><p><i>Ingest only matching log entries</i></p></EuiText>
        <EuiSpacer size="m" />
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
