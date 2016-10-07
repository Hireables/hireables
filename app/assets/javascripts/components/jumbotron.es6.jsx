import React from 'react';

const Jumbotron = () => (
  <div className="header header--bg">
    <div className="container">
      <div className="jumbotron jumbotron--small">
        <h3 className="bold">Find hireable developers on Github</h3>
        <p className="p-r-60">
          Hireables lets you find, filter and sort developers on Github.
          Search using tags (languages, followers, created, repos and location),
          paginate through lists and find who are are currently hireable on Github.
        </p>
        <div className="demo-tags p-t-20">
          <span
            className="react-tagsinput-tag demo-tags--highlight"
          >
            name:dave
          </span>
          <span
            className="react-tagsinput-tag demo-tags--highlight"
          >
            location:london
          </span>
          <span
            className="react-tagsinput-tag demo-tags--highlight"
          >
            language:ruby
          </span>
          <span
            className="react-tagsinput-tag demo-tags--highlight"
          >
            followers:>=100
          </span>
          <span
            className="react-tagsinput-tag demo-tags--highlight"
          >
            repos:>=20
          </span>
          <span
            className="react-tagsinput-tag demo-tags--highlight"
          >
            created:>=2013-05-11
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default Jumbotron;
