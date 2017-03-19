/* global Routes */
import popup from '../helpers/popup.es6';

export default class Medium {
  authenticate() {
    return popup(Routes.developer_medium_omniauth_authorize_path());
  }
}
