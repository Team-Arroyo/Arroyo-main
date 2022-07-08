import React from "react";


const Dropdown = ({choices}) => {

  return (
    <select>
      <option>Select A Log</option>
      { choices.map(c => {
        return (
          <option>{c}</option>
        )
      })}
    </select>
  )
}
 
export default Dropdown