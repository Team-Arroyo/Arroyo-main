import React, { useState } from 'react';
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
      options={options}
      listProps={{ bordered: true }}
      onChange={(newOptions) => setOptions(newOptions)}
    >
      {(list) => list}
    </EuiSelectable>
  );
}

export default SelectablePlay;
