/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store.js';
import ByQueryTab from '../components/ByQueryTab.jsx';
import exp from 'constants';

describe('by query compnents are rendering', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ByQueryTab />
      </Provider>,
    );
  });
  test('calendar inputs render', () => {
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
  });
  test('log attributes and values render', () => {
    expect(screen.getByLabelText(/Log Attribute/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Attribute Value/i)).toBeInTheDocument();
  });
  test('plus button renders', () => {
    expect(screen.getByLabelText(/add query search term/i)).toBeInTheDocument();
  });
  test('inglest button renders', () => {
    expect(screen.getByRole('button', { name: /Ingest Matching/i })).toBeInTheDocument();
  });
});

describe('performing a happy path', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ByQueryTab />
      </Provider>,
    );
  });
  test('ingest matching button is disabled', () => {
    expect(screen.getByRole('button', { name: /Ingest Matching/i })).toBeDisabled();
  });
  test('can enter query terms', async () => {
    const logAttributes = screen.getByLabelText(/Log Attribute/i);
    const logAttributesValues = screen.getByLabelText(/Attribute Value/i);
    await userEvent.type(logAttributes, 'request_method');
    await userEvent.type(logAttributesValues, 'GET');
    expect(logAttributes).toHaveValue('request_method');
    expect(logAttributesValues).toHaveValue('GET');
  });
  test('entered query terms render', async () => {
    const logAttributes = screen.getByLabelText(/Log Attribute/i);
    const logAttributesValues = screen.getByLabelText(/Attribute Value/i);
    const addButton = screen.getByLabelText(/add query search term/i);
    await userEvent.type(logAttributes, 'request_method');
    await userEvent.type(logAttributesValues, 'GET');
    await userEvent.click(addButton);
    expect(screen.getByText('request_method:GET')).toBeInTheDocument();
  });
  test('can remove query terms by clicking on it', async () => {
    const logAttributes = screen.getByLabelText(/Log Attribute/i);
    const logAttributesValues = screen.getByLabelText(/Attribute Value/i);
    const addButton = screen.getByLabelText(/add query search term/i);
    await userEvent.type(logAttributes, 'request_method');
    await userEvent.type(logAttributesValues, 'GET');
    await userEvent.click(addButton);
    const pill = screen.getByLabelText(/Click to remove Query Term/);
    await userEvent.click(pill);
    expect(screen.queryByText('request_method:GET')).not.toBeInTheDocument();
  });
});
