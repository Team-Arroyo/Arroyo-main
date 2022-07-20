import React, { useState } from 'react';
import { EuiSelect, useGeneratedHtmlId } from '@elastic/eui';

function FilterSelectKey() {
  const options = [
    { value: 'option_one', text: 'HTTP Method' },
    { value: 'option_two', text: 'IP' },
    { value: 'option_three', text: 'Type' },
  ];

  const [value, setValue] = useState(options[1].value);

  const basicSelectId = useGeneratedHtmlId({ prefix: 'basicSelect' });

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <EuiSelect
      id={basicSelectId}
      options={options}
      value={value}
      onChange={(e) => onChange(e)}
      aria-label="Use aria labels when no actual label is in use"
      full-width
    />
  );
}

export default FilterSelectKey;
