

// Bootstrap material
import * as mdb from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';

import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome';
import '../node_modules/@fortawesome/fontawesome-free/js/brands';
import '../node_modules/@fortawesome/fontawesome-free/js/solid';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'pale',
    values: [
      {
        name: 'pale',
        value: '#33333324',
      },
      {
        name: 'ligh',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
    ],
  },
}