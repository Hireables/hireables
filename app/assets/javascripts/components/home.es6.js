// Require React
React = require('react/addons');

// import material UI
import OrganizationsList from './organizations_list.es6.js';

// Define component
const Home = React.createClass({

  render() {
    return (
        <div className="container">
            <OrganizationsList />
        </div>
      );
  },
});

module.exports = Home;
