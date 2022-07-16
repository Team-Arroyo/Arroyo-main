import React, { useState, Fragment } from 'react';
import { EuiSelectable } from '@elastic/eui';

function SelectablePlay() {
  const starting = [
    { label: 'testOne' },
    { label: 'testtwo' },
    { label: 'testthree' },
  ];
  const [options, setOptions] = useState(starting);

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

export default SelectablePlay;
