import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiButton,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,

} from '@elastic/eui';
import { getLogLines } from '../features/toastSlice';
import { hasQueryTerms, queriesToArray } from '../libs/utils';

function IngestByQueryButton() {
  const dispatch = useDispatch();
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
            onClick={() => {
              console.log('Ingest by query button clicked');
              dispatch(getLogLines(payload));
            }}
          >
            Ingest Matching Log Entries
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default IngestByQueryButton;
