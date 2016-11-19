/* global Routes */
import popup from '../helpers/popup.es6';

export default class StackExchange {
  authenticate() {
    return popup(Routes.developer_stackexchange_omniauth_authorize_path());
  }
}
