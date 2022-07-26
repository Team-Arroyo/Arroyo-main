import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageBody,
  EuiGlobalToastList,
} from '@elastic/eui';
import PropTypes from 'prop-types';
import { removeToast } from '../features/toastSlice.js';

function PageContainer({ content }) {
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

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
        </EuiPageContent>
      </EuiPageBody>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(toast) => dispatch(removeToast(toast.id))}
        toastLifeTimeMs={6000}
      />
    </EuiPage>
  );
}

PageContainer.defaultProps = {
  content: null,
};

PageContainer.propTypes = {
  content: PropTypes.element,
};

export default PageContainer;
