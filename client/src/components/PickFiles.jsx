import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiSelectable,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
} from '@elastic/eui';
import convert from '../libs/utils';
import apiClient from '../libs/apiclient';
import { addToast } from '../features/toastSlice';

function PickFiles() {
  const choices = useSelector((state) => state.choices);
  const starting = convert.toOptions(choices);
  const [options, setOptions] = useState(starting);
  const dispatch = useDispatch();

  const handleIngest = () => {
    const selectedKeys = convert.toKeys(options);
    // eslint-disable-next-line no-console
    apiClient
      .getObjects(selectedKeys)
      .then(() => dispatch(addToast({ title: 'Files Ingested', text: 'Check Kibana', color: 'success' })));
  };
  const handleSelectAll = () => {
    const allSelected = options.map((o) => ({ ...o, checked: 'on' }));
    setOptions(allSelected);
  };
  const handleClearAll = () => {
    const allCleared = options.map((o) => ({ ...o, checked: null }));
    setOptions(allCleared);
  };

  useEffect(() => {
    setOptions(starting);
  }, [choices]);

  return (
    <>
      <EuiTitle size="s"><h2>Select</h2></EuiTitle>
      <EuiSpacer size="m" />
      <EuiSelectable
        aria-label="Basic example"
        searchable
        options={options}
        listProps={{ bordered: true }}
        onChange={(newOptions) => setOptions(newOptions)}
      >
        {(list, search) => (
          <Fragment key="searchable">
            {search}
            {list}
          </Fragment>
        )}
      </EuiSelectable>
      <EuiSpacer size="l" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButton onClick={handleSelectAll}>
            Select All Files
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={handleClearAll}>
            Clear All Selections
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiButton
            onClick={handleIngest}
            isDisabled={!(convert.toKeys(options)).length}
          >
            Ingest Selected Files
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}

export default PickFiles;
