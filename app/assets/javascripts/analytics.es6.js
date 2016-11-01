/* global ga mixpanel document */

import $ from 'jquery';
import DOMLoadEvent from './utils/domLoadEvent.es6';
import Environment from './helpers/environment.es6';

if (Environment.production()) {
  $(document).on(DOMLoadEvent, () => {
    ga('send', 'pageview');
  });
}
