import React from "react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
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

  test('renders searchS3 button', () => {
    expect(screen.getByText(/Search S3/)).toBeInTheDocument();
  });

  test('invalid date input makes a warning', async () => {
    const clearDateButtons = screen.getAllByRole('button', {name: /Clear input/});
    await userEvent.click(clearDateButtons[0])
    expect(
      screen.getByText(/Enter start and end date/i)
    ).toBeInTheDocument();
  });

  xtest('invalid date input disables searchS3 button', () => {

  })

  xtest('clicking searchS3 button calls fakeSetChoices', () => {

  })
})