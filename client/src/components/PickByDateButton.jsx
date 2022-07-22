import React from 'react';
import {
  EuiButton,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,

} from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import { getKeysAndSetChoices } from '../features/choicesSlice';
import { isValidDateRange } from '../libs/utils';

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
