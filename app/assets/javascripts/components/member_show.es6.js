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
import MemberMeta from './member_meta.es6.js'
import MemberStatus from './member_status.es6.js'
import Languages from './languages.es6.js'
import Search from './search.es6.js'

// Define component
const MemberShow = React.createClass({

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
        <div className="members-show">
          <header className="header header--bg">
            <div className="container">
              <div style={wrapperStyle}>
                <Avatar src={this.props.member.avatar_url} size={100} />
                <h1 className="no-margin">
                  <a href={this.props.member.html_url} style={linkStyles}>
                    {this.props.member.name}
                  </a>
                </h1>
                {this.props.member.email?
                <small>
                  <a href={"mailto:" + this.props.member.email} style={{color: Colors.grey700, paddingBottom: '5px'}}>
                    {"Email " + this.props.member.login}
                  </a>
                </small> : ""}
                {this.props.member.blog?
                <small>
                  <a target="_blank" style={{color: Colors.grey700, marginLeft: '10px', paddingBottom: '5px'}} href={this.props.member.blog}>Website</a>
                </small> : ""}
                <MemberStatus member={this.props.member} />
                <Languages languages={this.props.languages} />

                <div className="p-t-20">
                  <MemberMeta followers={this.props.member.followers} gists={this.props.member.public_gists} repos={this.props.member.public_repos} />
                </div>
              </div>
            </div>
          </header>
        </div>
      );
  }

});

module.exports = MemberShow;
