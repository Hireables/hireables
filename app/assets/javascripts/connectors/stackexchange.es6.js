/* global window SE */

import $ from 'jquery';

export default class StackExchange {
  constructor() {
    $.getScript(window.STACKOVERFLOW_JS_SDK_URL, (data, textStatus) => {
      if (textStatus === 'success') {
        SE.init({
          clientId: `${window.STACKOVERFLOW_CLIENT_ID}`,
          key: `${window.STACKOVERFLOW_CLIENT_KEY}`,
          channelUrl: `${window.location.protocol}//${window.location.hostname}/blank`,
          complete: () => {
            this.SE = SE;
          },
        });
      }
    });
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      this.SE.authenticate({
        success: (data) => {
          const uid = data.networkUsers[0].account_id;
          resolve({
            access_token: data.accessToken,
            uid,
            expires_at: data.expirationDate,
          });
        },
        error: () => reject('Can not login. Please try again!'),
        scope: ['private_info'],
        networkUsers: true,
      });
    });
  }
}
