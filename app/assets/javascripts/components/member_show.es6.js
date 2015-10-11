// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
var $ = require('jquery-browserify')

// Dependent component
import MemberMeta from './member_meta.es6.js'
import MemberStatus from './member_status.es6.js'
import Search from './search.es6.js'

// Material UI
let Avatar = mui.Avatar;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

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

    return (
        <div className="members-show">
          <header className="header header--bg">
            <div className="container">
              <div style={wrapperStyle}>
                <Avatar src={this.state.member.avatar_url} size={100} />
                <h1 className="no-margin">
                  {this.state.member.name}
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
    $.ajaxSetup({
      cache: false
    });

    $.getJSON('/members/' + id, function(json, textStatus) {
      this.setState({
        member: json
      });
    }.bind(this));
  }

});

module.exports = MemberShow;
