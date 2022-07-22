/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  EuiBadge,
  EuiPanel,
  EuiBadgeGroup,
  EuiSpacer,
} from '@elastic/eui';

function QueryBadges() {
  const queries = useSelector((state) => state.queries);
  const keys = Object.keys(queries);

  return (
    <>
      <EuiSpacer size="l" />
      <EuiPanel color="subdued" style={{ maxWidth: 400 }}>
        <EuiBadgeGroup gutterSize="s">
          { keys.map((k) => {
            return (
              <EuiBadge
                iconType="cross"
                iconSide="right"
                iconOnClick={() => {}}
                iconOnClickAriaLabel="Click this icon to..."
              >
                {`${k}:${queries[k]}`}
              </EuiBadge>
            )
          })}
        </EuiBadgeGroup>
      </EuiPanel>
    </>
  );
}

export default QueryBadges;
