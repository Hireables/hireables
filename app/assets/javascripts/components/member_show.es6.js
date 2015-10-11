// Require React
React = require('react/addons');
var $ = require('jquery-browserify');
// import material UI
import mui from 'material-ui';
let Avatar = mui.Avatar;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

// Dependent component
import MemberMeta from './member_meta.es6.js'
import MemberStatus from './member_status.es6.js'
import Search from './search.es6.js'

// Define component
const MemberShow = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      member: [],
      id: this.props.id
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._fetchMember(this.state.id);
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
                <Avatar src={this.state.member.avatar_url} size={100} />
                <h1 className="no-margin">
                  <a href={this.state.member.html_url} style={linkStyles}>
                    {this.state.member.name}
                  </a>
                </h1>
                <small>
                  <a href={"mailto:" + this.state.member.email}>
                    {"Email " + this.state.member.login}
                  </a>
                </small>
                <MemberStatus member={this.state.member} />
                <MemberMeta followers={this.state.member.followers} gists={this.state.member.public_gists} repos={this.state.member.public_repos} />
              </div>
            </div>
          </header>
          <div className="container p-b-100">
            <div className="members-show members--small sm-pull-reset">
              <Search action={"/members"} />
            </div>
          </div>
        </div>
      );
  },

  _fetchMember(id) {
    // Don't cache JSON
    $.ajaxSetup({
      cache: false
    });

    // Fetch member
    $.getJSON('/members/' + id, function(json, textStatus) {
      this.setState({
        member: json.member,
        languages: json.languages
      });
    }.bind(this));
  }

});

module.exports = MemberShow;
