import React from "react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import PickFiles from '../components/PickFiles'

describe('Pick Files', () => {
  beforeEach(() => {
    render(<PickFiles />)
    }
  );
  test('pick files renders', () => {
    expect(screen.getByText('Select')).toBeInTheDocument();
  });
  test('empty choice list when no choices are passed down', () => {
    const para = screen.getAllByText((content, element) => element.tagName.toLowerCase() === 'p' && element.innerHTML === 'No options available') 
    expect(para.length).toBeGreaterThan(1);
  });
  xtest('ingest button is disabled when no choice is selected', () => {

  });
  xtest('clear all button is rendered', () => {
    
  });
  xtest('select all button is rendered', () => {
    
  });
  // below tests don't work; likely due to elements of interest being out of scope
  // as the elements of interest are returned by an annoymouse function lines 41-46
  xtest('choices render when choices are passed down', () => {
    const choices = ['log file one', 'test2', 'three']
    // screen can't grab any of the choices even though the choices are passed down correctly
    // and are even correctly mapped into the options array
    render(<PickFiles choices={choices}/>)
  });
  // can't write the rest of these without being able to grab the elements of interest
  xtest('you can select a choice', () => {

  });
  xtest('you can select all choices', () => {

  });
  
})