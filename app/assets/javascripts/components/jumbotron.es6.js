// Require React
React = require('react/addons');
import Search from './search.es6.js'

// Define component
const Jumbotron = React.createClass({

  render() {

    return (
        <div className="jumbotron jumbotron--small">
          <div className="col-6">
            <h3 className="bold">Hire top developers through Github</h3>
            <p className="p-r-60">
              GithubHire lets you find hireable developers on Github.Just type the company
              name and find developers who are looking to be hired.
            </p>
          </div>
          <div className="organizations-list organizations--small sm-pull-reset">
            <Search action= {"/organizations"} />
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
