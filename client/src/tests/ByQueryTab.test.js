/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store.js';
import ByQueryTab from '../components/ByQueryTab.jsx';

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
  /* TODO: jest throws error of can't use import statement outside a module for 
  importing icons from elasticSearch */
  xtest('plus button renders', () => {
    expect(screen.getByLabelText(/add query search term/i)).toBeInTheDocument();
  });
  xtest('inglest button renders', () => {
    expect(screen.getByRole('button', { name: /Ingest Matching/i })).toBeInTheDocument();
  });
});
