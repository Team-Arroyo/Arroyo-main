import React from 'react';
import { useSelector } from 'react-redux';
import {
  EuiButton,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,

} from '@elastic/eui';
// import { getLogLines } from '../features/toastSlice';
import { hasQueryTerms, queriesToArray } from '../libs/utils';

function IngestByQueryButton() {
  const dateRange = useSelector((state) => state.dateRange);
  const queriesArr = useSelector((state) => state.queries);
  const payload = {
    startDate: dateRange.start,
    endDate: dateRange.end,
    queries: queriesToArray(queriesArr),
  };

  return (
    <EuiFormRow>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButton
            isDisabled={!hasQueryTerms()}
            onClick={() => console.log('payload', payload)}
          >
            Ingest Matching Log Enteries
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default IngestByQueryButton;
