import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  EuiPage,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageBody,
  EuiGlobalToastList,
  EuiButtonIcon,
  EuiToolTip,
} from '@elastic/eui';
import { icon as questionLogo } from '@elastic/eui/es/components/icon/assets/question_in_circle.js';
import PropTypes from 'prop-types';
import { removeToast } from '../features/toastSlice.js';
import arroyoLogo from './logos/arroyographic_color.svg';
import DOCS_URL from '../constants/Url.js';

function PageContainer({ content }) {
  const toasts = useSelector((state) => state.toasts);
  const dispatch = useDispatch();

  return (
    <EuiPage paddingSize="none">
      <EuiPageBody panelled>
        <EuiPageHeader
          restrictWidth
          iconType={arroyoLogo}
          pageTitle="Arroyo"
          rightSideItems={[
            <EuiToolTip content="Visit Help Docs">
              <EuiButtonIcon iconSize="xl" iconType={questionLogo} aria-label="Visit Help Docs" href={DOCS_URL} target="_blank" rel="noopener noreferrer" />
            </EuiToolTip>,
          ]}
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
