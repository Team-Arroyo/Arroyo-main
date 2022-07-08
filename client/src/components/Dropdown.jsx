import React from 'react';
import PropTypes from 'prop-types';

function Dropdown({ choices, onSelection }) {
  return (
    <select onChange={onSelection}>
      <option>Select A Log</option>
      { choices.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>
  );
}

Dropdown.defaultProps = {
  choices: [],
  onSelection: () => {},
};

Dropdown.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string),
  onSelection: PropTypes.func,
};

export default Dropdown;
