// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
var $ = require('jquery-browserify')

// Dependent component
import OrganizationMeta from './organization_meta.es6.js'
import MembersList from './members_list.es6.js'
import Search from './search.es6.js'

// Material UI
let Avatar = mui.Avatar;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

// Define component
const OrganizationsShow = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      org: [],
      id: this.props.id,
      members: []
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._fetchOrganization(this.state.id);
  },

  render() {

    let wrapperStyle = {
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center'
    }

    return (
        <div className="organization_show">
          <header className="header header--bg">
            <div className="container">
              <div style={wrapperStyle}>
                <Avatar src={this.state.org.avatar_url} size={100} />
                <h1 className="no-margin">
                  {this.state.org.name}
                </h1>
                <p dangerouslySetInnerHTML={{__html: this.state.org.description}}></p>
                <Search action={"/organizations"} />
              </div>
            </div>
          </header>
          <MembersList id={this.state.id} meta={true} />
        </div>
      );
  },

  _fetchOrganization(id) {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON('/organizations/' + id, function(json, textStatus) {
      this.setState({
        org: json
      });
    }.bind(this));
  }

});

module.exports = OrganizationsShow;
