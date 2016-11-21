/* global ga _gs document */

import $ from 'jquery';
import DOMLoadEvent from './utils/domLoadEvent.es6';
import Environment from './helpers/environment.es6';

const environment = new Environment();
if (environment.isProduction) {
  $(document).on(DOMLoadEvent, () => {
    ga('send', 'pageview');
    _gs('track');
  });
}
