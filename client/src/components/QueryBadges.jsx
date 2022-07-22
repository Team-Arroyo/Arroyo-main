import React from 'react';
import {
  EuiBadge,
  EuiPanel,
  EuiBadgeGroup,
  EuiSpacer,
} from '@elastic/eui';

function QueryBadges() {
  return (
    <>
      <EuiSpacer size="l" />
      <EuiPanel color="subdued" style={{ maxWidth: 400 }}>
        <EuiBadgeGroup gutterSize="s">
          <EuiBadge
            iconType="cross"
            iconSide="right"
            iconOnClick={() => {}}
            iconOnClickAriaLabel="Click this icon to..."
          >
            Test Badge
          </EuiBadge>
        </EuiBadgeGroup>
      </EuiPanel>
    </>
  );
}

export default QueryBadges;
