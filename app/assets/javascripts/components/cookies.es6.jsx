import React, { Component } from 'react';
import Cookies from 'js-cookie';
import guid from '../helpers/guid.es6';

export default class CookiesTracker extends Component {
  componentDidMount() {
    if (Cookies.get('visitor') === undefined) {
      Cookies.set('visitor', guid());
      Cookies.set(`${Cookies.get('visitor')}-email-clicks`, 0);
      Cookies.set(`${Cookies.get('visitor')}-clicks`, 0);
    }
  }

  render() {
    return (
      <noscript />
    );
  }
}
