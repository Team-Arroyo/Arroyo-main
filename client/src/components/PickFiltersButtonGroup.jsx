import React from 'react';
import {
  EuiButton,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import { isValidDateRange, hasQueryTerms } from '../libs/utils.js';
import { getKeysAndSetChoices } from '../features/choicesSlice.js';

function PickFiltersButtonGroup() {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateRange.start);
  const endDate = useSelector((state) => state.dateRange.end);

  const handleClick = () => {
    dispatch(getKeysAndSetChoices({ startDate, endDate }));
  };

  return (
    <EuiFormRow>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButton
            onClick={handleClick}
            isDisabled={!isValidDateRange() || hasQueryTerms()}
          >
            Select Log Files
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>

          <EuiButton
            isDisabled={!hasQueryTerms()}
          >
            Ingest Matching Log Enteries
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default PickFiltersButtonGroup;
