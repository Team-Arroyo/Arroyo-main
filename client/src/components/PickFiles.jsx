import React, { useState, Fragment, useEffect } from 'react';
import { EuiSelectable, EuiButton, EuiSpacer } from '@elastic/eui';
import PropTypes from 'prop-types';
import convert from '../libs/utils';

function PickFiles({ choices }) {
  const starting = convert.toOptions(choices);
  const [options, setOptions] = useState([]);
  const handleClick = () => {
    const selected = convert.toKeys(options);
    console.log(selected);
  };

  useEffect(() => {
    setOptions(starting);
  }, [choices]);

  return (
    <>
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
      <EuiButton onClick={handleClick}>
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
