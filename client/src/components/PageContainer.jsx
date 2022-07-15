import React from 'react';
import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageBody,
} from '@elastic/eui';
import PropTypes from 'prop-types';
import SelectablePlay from './SelectablePlay';

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
          <EuiPageContentBody restrictWidth>{content}</EuiPageContentBody>
          <EuiPageContentBody restrictWidth>{moreContent}</EuiPageContentBody>
          <SelectablePlay />
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
