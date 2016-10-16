/*
  Bootstrap components and api on DOM Load
*/

/* global Turbolinks document */
import Relay from 'react-relay';
import {
  mountComponents,
  unmountComponents,
} from './utils/componentMounter';

import Authentication from './helpers/authentication.es6';

const auth = new Authentication();
const setupNetworkLayer = () => {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('/graphql', {
      credentials: 'same-origin',
      fetchTimeout: 30000,
      retryDelays: [5000],
      headers: {
        'X-CSRF-Token': auth.csrfToken(),
      },
    })
  );
};

const renderComponents = () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof Turbolinks !== 'undefined' && typeof Turbolinks.controller !== 'undefined') {
      setupNetworkLayer();
      document.addEventListener('turbolinks:render', unmountComponents);
      document.addEventListener('turbolinks:load', mountComponents);
    } else {
      setupNetworkLayer();
      mountComponents();
    }
  });
};

export default renderComponents;
