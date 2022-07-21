/* eslint-disable no-console */
/* eslint-disable */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiButton,
  EuiSpacer,
  EuiTitle,
  EuiText,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiAccordion,
} from '@elastic/eui';
import DateRange from './DateRange';
import QueryTerms from './QueryTerms';
import { getKeysAndSetChoices } from '../features/choicesSlice';

function PickFilters() {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.dateRange.start)
  const endDate = useSelector((state) => state.dateRange.end)

  const handleClick = () => {
    console.log('from button', startDate)
    dispatch(getKeysAndSetChoices({startDate, endDate}));
  };

  return (
    <div>
      <EuiTitle size="s"><h2>Filter</h2></EuiTitle>
      <EuiSpacer size="m" />
      <EuiText><p>Select a Date Range</p></EuiText>
      <EuiSpacer size="s" />
      <EuiForm>
        <DateRange />
        
        {/* PILL BOX HERE */}

        <EuiSpacer size="xl" />
        <EuiAccordion id="query-accordion" buttonContent="Add Search Query">
          <QueryTerms />
        </EuiAccordion>
        <EuiSpacer size="xl" />
        <EuiFormRow>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiButton
                onClick={handleClick}
              >
                Search S3
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>

              <EuiButton>
                Ingest
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

        </EuiFormRow>
      </EuiForm>
    </div>
  );
}

export default PickFilters;
