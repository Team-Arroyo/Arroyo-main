import React, { useState } from 'react';
import { EuiFieldSearch } from '@elastic/eui';

function FilterSelectKey() {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <EuiFieldSearch
      placeholder="Search this"
      value={value}
      onChange={(e) => onChange(e)}
      isClearable
      aria-label="Use aria labels when no actual label is in use"
    />
  );
}

export default FilterSelectKey;
