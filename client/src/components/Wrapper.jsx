import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EuiTabbedContent, EuiText, EuiSpacer } from '@elastic/eui';
import { STATUS_URL } from '../constants/ApiRoutes.js';
import { addToast } from '../features/toastSlice.js';
import ByDateTab from './ByDateTab';
import ByQueryTab from './ByQueryTab';

function Wrapper() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const source = new EventSource(STATUS_URL);
    source.onmessage = (e) => {
      const event = JSON.parse(e.data);
      console.log('the event', event);
      dispatch(addToast(event));
    };
  }, []);

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
