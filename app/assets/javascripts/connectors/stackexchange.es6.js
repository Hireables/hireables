/* global window SE */

import $ from 'jquery';

export default {
  initialize() {
    $.getScript('//api.stackexchange.com/js/2.0/all.js', () => {
      SE.init({
        clientId: window.STACKOVERFLOW_CLIENT_ID,
        key: window.STACKOVERFLOW_CLIENT_KEY,
        channelUrl: `${window.location.hostname}/blank`,
      });
    });
  },


  authenticate() {
    SE.authenticate({
      success: data => (data),
      error: error => (error),
      scope: ['no_expiry'],
    });
  },
};
