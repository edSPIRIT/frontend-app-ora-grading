/* eslint-disable import/prefer-default-export */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';

import store from 'data/store';
import {
  APP_READY,
  APP_INIT_ERROR,
  initialize,
  subscribe,
  mergeConfig,
} from '@edx/frontend-platform';

import { messages as footerMessages } from '@edx/frontend-component-footer';
import { messages as headerMesssages } from '@edx/frontend-component-header';

import { IntlProvider } from '@edx/frontend-platform/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import REACT_QUERY_CONSTANTS from './data/constants/react-query-constants';

import messages from './i18n';

import App from './App';

subscribe(APP_READY, () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      ...REACT_QUERY_CONSTANTS,
    },
  });
  ReactDOM.render(
    <IntlProvider locale="en">
      <AppProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppProvider>
    </IntlProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById('root'),
  );
});

export const appName = 'OraGradingAppConfig';

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL || null,
        AC_LANGUAGES_API_URL: process.env.AC_LANGUAGES_API_URL,
        AC_INSTANCE_CONFIG_API_URL: process.env.AC_INSTANCE_CONFIG_API_URL,
      }, appName);
    },
  },
  messages: [
    messages,
    headerMesssages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
});
