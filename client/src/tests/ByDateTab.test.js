/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store.js';
import ByDateTab from '../components/ByDateTab';

describe('by dates compnents are rendering', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ByDateTab />
      </Provider>,
    );
  });
  test('select log files button renders', () => {
    expect(screen.getByRole('button', { name: /Select Log/i })).toBeInTheDocument();
  });
  test('calendar inputs render', () => {
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();
  });
  test('select all files button renders', () => {
    expect(screen.getByRole('button', { name: /Select All/i })).toBeInTheDocument();
  });
  test('clear all selections button renders', () => {
    expect(screen.getByRole('button', { name: /Clear All/i })).toBeInTheDocument();
  });
  test('inglest button renders', () => {
    expect(screen.getByRole('button', { name: /Ingest/i })).toBeInTheDocument();
  });
});
