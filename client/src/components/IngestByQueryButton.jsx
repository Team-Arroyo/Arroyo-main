import React from 'react';
import {
  EuiButton,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,

} from '@elastic/eui';
import { hasQueryTerms } from '../libs/utils';

function IngestByQueryButton() {
  return (
    <EuiFormRow>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButton
            isDisabled={!hasQueryTerms()}
            onClick={() => console.log('sending query terms to back-end')}
          >
            Ingest Matching Log Enteries
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default IngestByQueryButton;
