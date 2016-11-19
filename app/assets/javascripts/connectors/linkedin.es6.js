/* global Routes */
import popup from '../helpers/popup.es6';

export default class Linkedin {
  authenticate() {
    return popup(Routes.developer_linkedin_omniauth_authorize_path());
  }
}
