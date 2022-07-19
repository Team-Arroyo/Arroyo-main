import React from "react";
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react';
import PickFilters from "../components/PickFilters";

describe('Pick Filters', () => {
  beforeEach(() => {
    const fakeSetChoices = jest.fn();
    render(<PickFilters setChoices={fakeSetChoices}/>)
    }
  );
  test('renders date picker', () => {
    
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
  });

  test('does it re-render each time', () => {
    screen.debug()
  })
})