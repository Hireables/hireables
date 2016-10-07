import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Footer = () => {
  const toolbarStyles = {
    backgroundColor: 'transparent',
    maxWidth: '980px',
    padding: '0',
    margin: '0 auto',
    link: {
      textDecoration: 'none',
    },
    powered: {
      display: 'block',
    },
  };

  const fontStyles = {
    paddingLeft: '0px',
    marginRight: '10px',
    color: '#bdbdbd',
  };

  const toolbarTitleStyles = {
    fontSize: '16px',
    color: '#bdbdbd',
  };

  const toolbarCopyrightStyles = {
    fontSize: '13px',
    color: '#bdbdbd',
  };

  const betaStyles = {
    fontSize: '11px',
    color: '#bdbdbd',
  };

  return (
    <MuiThemeProvider>
      <div className="footer">
        <div className="container">
          <Toolbar style={toolbarStyles} className="footer--toolbar">
            <ToolbarGroup key={0} className="powered" style={toolbarStyles.powered}>
              <a
                href="https://github.com"
                target="_blank"
                className="link"
                rel="noopener noreferrer"
                style={toolbarStyles.link}
              >
                <ToolbarTitle
                  text="Powered by Github API"
                  style={toolbarTitleStyles}
                />
              </a>
              <span style={betaStyles}>BETA</span>
            </ToolbarGroup>
            <ToolbarGroup key={1} lastChild className="copyright">
              <a
                href="https://github.com/gauravtiwari/hireables"
                target="_blank"
                style={toolbarStyles.link}
                className="github--link"
                rel="noopener noreferrer"
              >
                <ToolbarTitle text="Code" style={toolbarCopyrightStyles} />
              </a>
              <a
                href="https://github.com/gauravtiwari"
                target="_blank"
                className="link"
                style={toolbarStyles.link}
                rel="noopener noreferrer"
              >
                <ToolbarTitle
                  text="&copy; Copyright 2015-2016 Hireables"
                  style={toolbarCopyrightStyles}
                />
              </a>
            </ToolbarGroup>
          </Toolbar>

          <hr />

          <small style={fontStyles} className="p-b-20 col-8 disclaimer">
            Disclaimer: This project is not affiliated with GitHub.
            GitHub® and the Octocat® logo are registered trademarks of GitHub,
            Inc., used with permission—https://github.com/logos
          </small>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default Footer;
