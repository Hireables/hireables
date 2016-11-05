/* global ga _gs mixpanel document */

import $ from 'jquery';
import DOMLoadEvent from './utils/domLoadEvent.es6';
import environment from './helpers/environment.es6';

if (environment.isProduction) {
  $(document).on(DOMLoadEvent, () => {
    ga('send', 'pageview');
    _gs('track');
  });
}
