import React from 'react';
import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageBody,
  EuiTitle,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import PropTypes from 'prop-types';

function PageContainer({ content, moreContent }) {
  return (
    <EuiPage paddingSize="none">
      <EuiPageBody panelled>
        <EuiPageHeader
          restrictWidth
          iconType="logoElastic"
          pageTitle="Rehydrate Logs"
        />
        <EuiPageContent
          hasBorder={false}
          hasShadow={false}
          paddingSize="none"
          color="transparent"
          borderRadius="none"
        >
          <EuiTitle size="s"><h2>Filter</h2></EuiTitle>
          <EuiSpacer size="m" />
          <EuiText><p>Select a Date Range</p></EuiText>
          <EuiSpacer size="s" />
          <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>

          <EuiTitle size="s"><h2>Select</h2></EuiTitle>
          <EuiSpacer size="m" />
          <EuiPageContentBody restrictWidth>{moreContent}</EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

PageContainer.defaultProps = {
  content: {},
  moreContent: {},
};

PageContainer.propTypes = {
  content: PropTypes.element,
  moreContent: PropTypes.element,
};

export default PageContainer;
