// Require React
React = require('react/addons');

// Define component
const Jumbotron = React.createClass({

  render() {

    return (
        <div className="header header--bg">
          <div className="container">
            <div className="jumbotron jumbotron--small">
              <div className="col-6">
                <h3 className="bold">Hire top developers through Github</h3>
                <p className="p-r-60">
                  GithubHire lets you find, filter and sort developers on Github. Search using tags (languages, followers, joined, repos and location),
                  paginate through lists and find who are hireable.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
