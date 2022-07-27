import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiFieldText,
  EuiButtonIcon,
} from '@elastic/eui';
import { icon as plusIcon } from '@elastic/eui/es/components/icon/assets/plus.js';
import { icon as searchIcon } from '@elastic/eui/es/components/icon/assets/search.js';
// import { plusIcon, searchIcon } from '../libs/icons.js';
import { addQuery } from '../features/queriesSlice.js';

function QueryTerms() {
  const dispatch = useDispatch();
  const [column, setColumn] = useState('');
  const [columnValue, setColumnValue] = useState('');
  const handleChangeColumn = (c) => setColumn(c.target.value);
  const handleChangeColumnValue = (cv) => setColumnValue(cv.target.value);
  const handleAddQueryClick = () => {
    dispatch(addQuery({ column, columnValue }));
    setColumn('');
    setColumnValue('');
  };

  return (
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
  );
}

export default QueryTerms;
