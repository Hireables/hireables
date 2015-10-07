// Require React
React = require('react/addons');

// import material UI
import OrganizationsList from './organizations_list.es6.js';
import Jumbotron from './jumbotron.es6.js'

// Define component
const Home = React.createClass({

  render() {
    return (
        <div className="content">
          <header className="header header--bg">
            <div className="container">
              <Jumbotron />
            </div>
          </header>
          <div className="container">
            <OrganizationsList />
          </div>
        </div>
      );
  },
});

module.exports = Home;
