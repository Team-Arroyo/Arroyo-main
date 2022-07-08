import React from "react";


const Dropdown = ({choices, onSelection}) => {

  return (
    <select onChange={onSelection}>
      <option>Select A Log</option>
      { choices.map((c, i) => {
        return (
          <option key={i}>{c}</option>
        )
      })}
    </select>
  )
}
 
export default Dropdown