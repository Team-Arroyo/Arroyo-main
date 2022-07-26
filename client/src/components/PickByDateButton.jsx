import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiButton,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import { isValidDateRange } from '../libs/utils.js';
import { getKeysAndSetChoices } from '../features/choicesSlice.js';

function PickByDateButton() {
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
            isDisabled={!isValidDateRange()}
          >
            Select Log Files
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFormRow>
  );
}

export default PickByDateButton;
