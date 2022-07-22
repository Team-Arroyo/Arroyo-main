/* eslint-disable no-console */
/* eslint-disable */

import React from 'react';
import {
  EuiSpacer,
  EuiTitle,
  EuiText,
  EuiForm,
  EuiAccordion,
} from '@elastic/eui';
import DateRange from './DateRange';
import QueryTerms from './QueryTerms';
import PickFiltersButtonGroup from './PickFiltersButtonGroup';

function PickFilters() {
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
        <PickFiltersButtonGroup />
      </EuiForm>
    </div>
  );
}

export default PickFilters;
