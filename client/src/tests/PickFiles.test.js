import React from "react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import PickFiles from '../components/PickFiles'

describe('Pick Files', () => {
  test('pick files renders', () => {
    render(<PickFiles choices={['one', 'two', 'trees']} />)
  });
  xtest('empty choice list when no choices are passed down', () => {

  });
  xtest('choices render when choices are passed down', () => {

  });
  xtest('you can select a choice', () => {

  });
  xtest('you can select all choices', () => {

  });
  xtest('ingest button is disabled when no choice is selected', () => {

  });
})