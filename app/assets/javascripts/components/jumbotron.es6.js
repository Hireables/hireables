// Require React
React = require('react/addons');
// Define component
const Jumbotron = React.createClass({

  render() {

    return (
        <div className="jumbotron jumbotron--small">
          <div className="col-6">
            <h3 className="bold">Hire top developers talents through Github</h3>
            <p className="p-r-60">
              GithubHire lets you find hireable developers on Github.
              Just type the company name and sort developers who are hireable.
            </p>
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
