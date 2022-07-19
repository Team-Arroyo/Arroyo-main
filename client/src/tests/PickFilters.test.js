import React from "react";
import '@testing-library/jest-dom'
import {render, screen, fireEvent} from '@testing-library/react';
import PickFilters from "../components/PickFilters";

describe('Pick Filters', () => {
  test('renders date picker', () => {
    const fakeSetChoices = jest.fn();
    render(<PickFilters setChoices={fakeSetChoices}/>)
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
  })
})