/* global Routes */
import popup from '../helpers/popup.es6';

export default class ProductHunt {
  authenticate() {
    return popup(Routes.developer_producthunt_omniauth_authorize_path());
  }
}
