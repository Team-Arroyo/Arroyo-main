import React, { useState, Fragment, useEffect } from 'react';
import { EuiSelectable } from '@elastic/eui';
import PropTypes from 'prop-types';
import convert from '../libs/utils';

function PickFiles({ choices }) {
  const starting = convert.toOptions(choices);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(starting);
  }, [choices]);

  return (
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
  );
}

PickFiles.defaultProps = {
  choices: [],
};

PickFiles.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
};

export default PickFiles;
