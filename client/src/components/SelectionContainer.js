import React from "react";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";


const SelectionContainer = () => {
  const [choices, setChoices] = useState([])
  const [choice, setChoice] = useState('')

  useEffect(()=>{
    console.log('an effect')
  }, [])

  console.log("choices", choices)
  
  if (!choice.length) {
    return (
      <p>Loading Logs ...</p>
    )
  }
  return (
    <>
      <Dropdown choices={choices} />
      <p></p>
      <button>Get Log</button>
    </>
  )
}

export default SelectionContainer