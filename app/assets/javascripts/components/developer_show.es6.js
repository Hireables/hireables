// Require React
React = require('react/addons');
// import material UI
import mui from 'material-ui';
let Avatar = mui.Avatar;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let FontIcon = mui.FontIcon;
let LightRawTheme = mui.Styles.LightRawTheme;

// Dependent component
import DeveloperMeta from './developer_meta.es6.js'
import DeveloperStatus from './developer_status.es6.js'
import Languages from './languages.es6.js'
import Search from './search.es6.js'

// Define component
const DeveloperShow = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {

    let wrapperStyle = {
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center'
    }

    let linkStyles = {
      textStyle: 'none',
      textDecoration: 'none',
      color: '#333'
    }

    return (
        <div className="developers-show">
          <header className="header header--bg">
            <div className="container">
              <div style={wrapperStyle}>
                <Avatar src={this.props.developer.avatar_url} size={100} />
                <h1 className="no-margin">
                  <a href={this.props.developer.html_url} style={linkStyles}>
                    {this.props.developer.name}
                  </a>
                </h1>
                {this.props.developer.blog?
                <small>
                  <a target="_blank" style={{color: Colors.grey700, marginLeft: '10px', paddingBottom: '5px', cursor: 'pointer'}} href={this.props.developer.blog}>Website</a>
                </small> : ""}
                <DeveloperStatus developer={this.props.developer} />
                <Languages languages={this.props.languages} />

                <div className="p-t-20">
                  <DeveloperMeta followers={this.props.developer.followers} gists={this.props.developer.public_gists} repos={this.props.developer.public_repos} />
                </div>
              </div>
            </div>
          </header>
        </div>
      );
  }

});

module.exports = DeveloperShow;
