/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider, EuiThemeProvider, EuiThemeAmsterdam } from '@elastic/eui';
import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon.js';
import { icon as EuiIconCalendar } from '@elastic/eui/es/components/icon/assets/calendar.js';
import { icon as EuiIconSortRight } from '@elastic/eui/es/components/icon/assets/sortRight.js';
import createCache from '@emotion/cache';

import PageContainer from './components/PageContainer.jsx';
import SelectionContainer from './components/SelectionContainer.jsx';

// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
  calendar: EuiIconCalendar,
  sortRight: EuiIconSortRight,
});

function App() {
  const cache = createCache({
    key: 'eui',
    container: document.querySelector('meta[name="eui-style-insert"]'),
  });
  cache.compat = true;

  return (
    <EuiProvider cache={cache} colorMode="light">
      <EuiThemeProvider theme={EuiThemeAmsterdam}>
        <PageContainer content={SelectionContainer()} />
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;
