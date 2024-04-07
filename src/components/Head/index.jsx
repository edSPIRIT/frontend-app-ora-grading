import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import messages from './messages';
import useGetConfig from '../../hooks/useGetConfig';

const Head = () => {
  const { formatMessage } = useIntl();

  const {
    platformName,
  } = useGetConfig();

  return (
    <Helmet>
      <title>
        {formatMessage(messages.PageTitle, { siteName: platformName || getConfig().SITE_NAME })}
      </title>
    </Helmet>
  );
};

export default Head;
