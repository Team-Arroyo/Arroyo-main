import React from 'react';
import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageBody,
} from '@elastic/eui';
import PropTypes from 'prop-types';
// import SelectionContainer from './SelectionContainer';

function PageContainer({ content }) {
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
          {/* <SelectionContainer /> */}
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

PageContainer.defaultProps = {
  content: {},
};

PageContainer.propTypes = {
  content: PropTypes.
};

export default PageContainer;
