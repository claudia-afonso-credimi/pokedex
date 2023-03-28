import React from 'react';
import "@formatjs/intl-pluralrules/dist/locale-data/en"
import messages from '../data/i18n/en'
import { Layout } from "./layout"

export default (props: any) => (
  <Layout
    {...props}
    messages={messages}
  />
);
