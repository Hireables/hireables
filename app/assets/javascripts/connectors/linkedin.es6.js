/* global window IN */

import $ from 'jquery';

export default {
  initialize() {
    $.getScript(window.LINKEDIN_JS_SDK_URL, () => {
      IN.init({
        api_key: window.LINKEDIN_CLIENT_ID,
        scope: 'r_basicprofile r_emailaddress',
        lang: 'en',
      });
    });
  },

  authenticate() {
    IN.User.authorize(() => {
      console.log('authenticate');
    }, callbackScope);
  },
};
