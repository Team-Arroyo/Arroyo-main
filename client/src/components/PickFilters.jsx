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
import PropTypes from 'prop-types';
import { icon as searchIcon } from '@elastic/eui/es/components/icon/assets/search';
import { icon as plusIcon } from '@elastic/eui/es/components/icon/assets/plus';
// import { icon as trashIcon } from '@elastic/eui/es/components/icon/assets/trash';
import DateRange from './DateRange';
import apiClient from '../libs/apiclient';

function PickFilters({ setChoices }) {

  const [column, setColumn] = useState('');
  const [columnValue, setColumnValue] = useState('');
  const [queries, setQueries] = useState([]);

  const handleChangeColumn = (c) => setColumn(c.target.value);
  const handleChangeColumnValue = (cv) => setColumnValue(cv.target.value);
  const handleAddQueryClick = () => {
    setQueries([...queries, { column: columnValue }]);
    console.log(queries);
    setColumn('');
    setColumnValue('');
  };

  const handleClick = () => {
    console.log('clicked');
    // apiClient
    //   .getKeys(formatDate(startDate), formatDate(endDate))
    //   .then(
    //     (keys) => setChoices(keys),
    //   )
    //   .catch((e) => console.log(e));
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
        <EuiAccordion buttonContent="Add Search Query">
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

PickFilters.defaultProps = {
  setChoices: () => console.log('the real function wasn not passed down'),
};

PickFilters.propTypes = {
  setChoices: PropTypes.func,
};

export default PickFilters;
