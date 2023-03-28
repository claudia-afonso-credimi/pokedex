import React from 'react';
import "@formatjs/intl-pluralrules/dist/locale-data/it"
import messages from '../data/i18n/it'
import { Layout } from "./layout"

export default (props: any) => (
  <Layout
    {...props}
    messages={messages}
  />
);
