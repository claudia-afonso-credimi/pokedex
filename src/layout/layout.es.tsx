import React from 'react';
import "@formatjs/intl-pluralrules/dist/locale-data/es"
import messages from '../data/i18n/es'
import { Layout } from "./layout"

export default (props: any) => (
  <Layout
    {...props}
    messages={messages}
  />
);
