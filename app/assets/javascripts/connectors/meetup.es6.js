/* global window Routes */
import popup from '../helpers/popup.es6';

export default class Meetup {
  authenticate() {
    return popup(Routes.developer_meetup_omniauth_authorize_path());
  }
}
