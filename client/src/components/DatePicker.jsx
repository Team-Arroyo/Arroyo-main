/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  EuiSuperDatePicker,
  EuiSpacer,
  EuiFormControlLayoutDelimited,
  EuiFormLabel,
  EuiPanel,
  EuiText,
  // OnRefreshProps,
  // OnTimeChangeProps,
} from '@elastic/eui';

function DatePicker() {
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState('now-30m');
  const [end, setEnd] = useState('now');
  const stopLoading = () => {
    setIsLoading(false);
  };
  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const onTimeChange = ({ start, end }) => {
    setStart(start);
    setEnd(end);
    setIsLoading(true);
    startLoading();
  };

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const onStartInputChange = (e) => {
    setStart(e.target.value);
  };

  const onEndInputChange = (e) => {
    setEnd(e.target.value);
  };

  const renderTimeRange = () => {
    return (
      <EuiPanel color="subdued" paddingSize="m">
        <EuiText size="s">
          EuiSuperDatePicker should be resilient to invalid date values. You can
          try to break it with unexpected values here.
        </EuiText>
        <EuiSpacer />
        <EuiFormControlLayoutDelimited
          prepend={<EuiFormLabel>Dates</EuiFormLabel>}
          startControl={
            <input
              onChange={onStartInputChange}
              type="text"
              value={start}
              placeholder="start"
              className="euiFieldText"
            />
          }
          endControl={
            <input
              onChange={onEndInputChange}
              type="text"
              placeholder="end"
              value={end}
              className="euiFieldText"
            />
          }
        />
      </EuiPanel>
    );
  };

  return (
    <>
      {renderTimeRange()}
      <EuiSpacer />
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
      />
    </>
  );
};

export default DatePicker;