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
                  GithubHire lets you find, filter and sort developers on Github. Search using tags (languages, followers, created, repos and location),
                  paginate through lists and find who are hireable.
                </p>
              </div>
              <div className="col-4">
                <div className="demo-tags p-t-20">
                  <span className="react-tagsinput-tag demo-tags--highlight">keyword:tom</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">location:london</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">language:ruby</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">language:php</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">followers:>=100</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">repos:>=100</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">location:france</span>
                  <span className="react-tagsinput-tag demo-tags--highlight">created:>=2014-10-11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
