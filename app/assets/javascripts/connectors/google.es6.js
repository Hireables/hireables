/* global window document gapi */

import $ from 'jquery';

export default {
  initialize() {
    $.getScript(window.GOOGLE_JS_SDK_URL, () => {
      gapi.load('client:auth2', this.initClient);
    });
  },

  initClient() {
    gapi.client.init({
      apiKey: window.GOOGLE_API_KEY,
      clientId: window.GOOGLE_CLIENT_ID,
      scope: 'profile, youtube',
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.authenticate);
    });
  },

  authenticate() {
    console.log(gapi.auth2.AuthResponse);
  },
};
