/* eslint-disable no-console */
/* eslint-disable */

import React, { useState } from 'react';
import {
  EuiButton,
  EuiSpacer,
  EuiTitle,
  EuiText,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFieldText,
  EuiAccordion,
  EuiPanel,
  EuiButtonIcon,
} from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import { icon as searchIcon } from '@elastic/eui/es/components/icon/assets/search';
import { icon as plusIcon } from '@elastic/eui/es/components/icon/assets/plus';
// import { icon as trashIcon } from '@elastic/eui/es/components/icon/assets/trash';
import DateRange from './DateRange';
import { getKeysAndSetChoices } from '../features/choicesSlice';

function PickFilters() {
  const dispatch = useDispatch();
  const [column, setColumn] = useState('');
  const [columnValue, setColumnValue] = useState('');
  const [queries, setQueries] = useState([]);
  const startDate = useSelector((state) => state.dateRange.start)
  const endDate = useSelector((state) => state.dateRange.end)
  const handleChangeColumn = (c) => setColumn(c.target.value);
  const handleChangeColumnValue = (cv) => setColumnValue(cv.target.value);
  const handleAddQueryClick = () => {
    setQueries([...queries, { column: columnValue }]);
    console.log(queries);
    setColumn('');
    setColumnValue('');
  };

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
          <EuiPanel color="primary">
            <EuiFlexGroup style={{ maxWidth: 600 }} gutterSize="l" alignItems="flexEnd" justifyContent="flexEnd">
              <EuiFlexItem>
                <EuiFormRow label="Log Attribute" component="form">
                  <EuiFieldText
                    placeholder="ex. HTTP Method"
                    value={column}
                    onChange={handleChangeColumn}
                    icon={searchIcon}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow label="Attribute Value" component="form">
                  <EuiFieldText
                    placeholder="ex. GET"
                    value={columnValue}
                    onChange={handleChangeColumnValue}
                    icon={searchIcon}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow>
                  <EuiButtonIcon
                    iconType={plusIcon}
                    size="m"
                    display="base"
                    onClick={handleAddQueryClick}
                    aria-label="add query search term"
                    aria-labelledby="add query search term"
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
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
