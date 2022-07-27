import React from 'react';
import { EuiTabbedContent, EuiText, EuiSpacer } from '@elastic/eui';
import ByDateTab from './ByDateTab';
import ByQueryTab from './ByQueryTab';

function Wrapper() {
  const tabs = [
    {
      id: 'bydate-tab',
      name: 'By Date Range',
      content: (<ByDateTab />),
    },
    {
      id: 'byquery-tab',
      name: 'By Search Term',
      content: (<ByQueryTab />),
    },
  ];

  return (
    <>
      <EuiText size="s"><h2>Rehydrate Logs</h2></EuiText>
      <EuiSpacer size="xs" />
      <EuiTabbedContent
        tabs={tabs}
        initialSelectedTab={tabs[0]}
        autoFocus="selected"
      />
    </>

  );
}

export default Wrapper;
