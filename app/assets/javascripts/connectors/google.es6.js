/* global Routes */
import popup from '../helpers/popup.es6';

export default class Google {
  authenticate() {
    return popup(Routes.developer_google_omniauth_authorize_path());
  }
}
