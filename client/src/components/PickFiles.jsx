import React, { useState, Fragment, useEffect } from 'react';
import {
  EuiSelectable, EuiButton, EuiSpacer, EuiFlexGroup, EuiFlexItem, EuiTitle,
} from '@elastic/eui';
import PropTypes from 'prop-types';
import convert from '../libs/utils';
import apiClient from '../libs/apiclient';

function PickFiles({ choices }) {
  const starting = convert.toOptions(choices);
  const [options, setOptions] = useState([]);
  const handleIngest = () => {
    const selectedKeys = convert.toKeys(options);
    // eslint-disable-next-line no-console
    apiClient.getObjects(selectedKeys).then((r) => console.log(r));
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
      <EuiSpacer size="m" />
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
            Select All
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton onClick={handleClearAll}>
            Clear All
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      <EuiButton
        onClick={handleIngest}
        isDisabled={!(convert.toKeys(options)).length}
      >
        Ingest Logs
      </EuiButton>
    </>
  );
}

PickFiles.defaultProps = {
  choices: [],
};

PickFiles.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
};

export default PickFiles;
