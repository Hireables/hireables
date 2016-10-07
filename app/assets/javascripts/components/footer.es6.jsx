import React, { Component } from 'react';
import mui from 'material-ui';

const Toolbar = mui.Toolbar;
const ToolbarGroup = mui.ToolbarGroup;
const ToolbarTitle = mui.ToolbarTitle;
const ThemeManager = mui.Styles.ThemeManager;
const LightRawTheme = mui.Styles.LightRawTheme;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.muiTheme = ThemeManager.getMuiTheme(LightRawTheme);
  }

  render() {
    const toolbarStyles = {
      backgroundColor: 'transparent',
      maxWidth: '980px',
      padding: '0',
      margin: '0 auto',
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
      <div className="footer">
        <div className="container">
          <Toolbar style={toolbarStyles} className="footer--toolbar">
            <ToolbarGroup key={0} float="left" className="powered">
              <a
                href="https://github.com"
                target="_blank"
                className="link"
                rel="noopener noreferrer"
              >
                <ToolbarTitle
                  text="Powered by Github API"
                  style={toolbarTitleStyles}
                />
              </a>
              <span style={betaStyles}>BETA</span>
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right" className="copyright">
              <a
                href="https://github.com/gauravtiwari/hireables"
                target="_blank"
                className="github--link"
                rel="noopener noreferrer"
              >
                <ToolbarTitle text="Code" style={toolbarCopyrightStyles} />
              </a>
              <a
                href="https://github.com/gauravtiwari"
                target="_blank"
                className="link"
                rel="noopener noreferrer"
              >
                <ToolbarTitle
                  text="Copyright 2015-2016 Hireables"
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
    );
  }
}

Footer.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default Footer;
