// Require React
React = require('react/addons');

// Define component
const Jumbotron = React.createClass({

  render() {

    return (
        <div className="header header--bg">
          <div className="container">
            <div className="jumbotron jumbotron--small">
              <h3 className="bold">Find hireable developers on Github</h3>
              <p className="p-r-60">
                Hireables lets you find, filter and sort developers on Github. Search using tags (languages, followers, created, repos and location),
                paginate through lists and find who are are currently hireable on Github.
              </p>
              <div className="demo-tags p-t-20">
                <span className="react-tagsinput-tag demo-tags--highlight">keyword:dave</span>
                <span className="react-tagsinput-tag demo-tags--highlight">location:london</span>
                <span className="react-tagsinput-tag demo-tags--highlight">language:ruby</span>
              </div>
            </div>
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
