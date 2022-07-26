import React from 'react';
import {
  EuiSpacer,
  EuiTitle,
  EuiText,
  EuiForm,
  EuiAccordion,
} from '@elastic/eui';
import DateRange from './DateRange';
import PickFiltersButtonGroup from './PickFiltersButtonGroup';
import QueryBadges from './QueryBadges';
import QueryTerms from './QueryTerms';

function PickFilters() {
  return (
    <div>
      <EuiTitle size="s"><h2>Filter</h2></EuiTitle>
      <EuiSpacer size="m" />
      <EuiText><p>Select a Date Range</p></EuiText>
      <EuiSpacer size="s" />
      <EuiForm>
        <DateRange />
        <QueryBadges />
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
