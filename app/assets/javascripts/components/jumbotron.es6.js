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
              <div className="col-4">
                <h3>
                  Example filters:
                </h3>
                <div>
                  <span className="react-tagsinput-tag">keyword:tom</span>
                  <span className="react-tagsinput-tag">location:london</span>
                  <span className="react-tagsinput-tag">language:ruby</span>
                  <span className="react-tagsinput-tag">followers:>=100</span>
                  <span className="react-tagsinput-tag">repos:>=100</span>
                  <span className="react-tagsinput-tag">created:>=2014-10-11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
