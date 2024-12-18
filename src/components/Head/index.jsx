import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from '@edx/frontend-platform/i18n';
import useGetConfig from '../../useGetConfig';

import messages from './messages';

const Head = () => {
  const { formatMessage } = useIntl();
  const { platformName, favicon } = useGetConfig();

  return (
    <Helmet>
      <title>
        {formatMessage(messages.PageTitle, { siteName: platformName })}
      </title>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
  );
};

export default Head;
