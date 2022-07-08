import React from "react";
import Dropdown from "./Dropdown.js";
import { useEffect, useState } from "react";
import apiClient from "../libs/apiclient.js";

const SelectionContainer = () => {
  const [choices, setChoices] = useState([])
  const [choice, setChoice] = useState('')

  useEffect(()=>{
    apiClient.getKeys().then(
      keys => setChoices(keys)
    )
  }, [])

  const handleSelection = (e) => {
    setChoice(e.target.value)
  }

  const handleClick = (e) => {
    if (choice === "Select A Log") {
      console.log("not sending anything ty")
      return;
    }
    apiClient.getObject(choice)
      .then(
        r => console.log(r)
      )
  }

    return (
    <>
      <Dropdown choices={choices} onSelection={handleSelection}/>
      <p></p>
      <button onClick={handleClick}>Get Log</button>
    </>
  )
  
  
}

export default SelectionContainer

