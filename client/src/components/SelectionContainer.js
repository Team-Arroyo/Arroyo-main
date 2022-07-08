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


    console.log("Chose dropdown path")
    return (
    <>
      <Dropdown choices={choices} />
      <p></p>
      <button>Get Log</button>
    </>
  )
  
  
}

export default SelectionContainer

