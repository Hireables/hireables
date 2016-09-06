// Require React
React = require('react/addons');
const Cookies = require('js-cookie');
const guid = require('../helpers/guid.es6.js')();

// Define component
const CookiesTracker = React.createClass({
  componentDidMount() {
    if (Cookies.get('visitor') === undefined) {
      Cookies.set('visitor', guid);
      Cookies.set(Cookies.get('visitor') + '-email-clicks', 0);
      Cookies.set(Cookies.get('visitor') + '-clicks', 0);
    }
  },

  render() {
    return (
        <noscript />
      );
  },
});

module.exports = CookiesTracker;
