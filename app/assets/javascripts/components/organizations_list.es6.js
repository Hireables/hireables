// Require React
React = require('react/addons');
var $ = require('jquery-browserify');
var Loader = require('react-loader');

// import material UI
import mui from 'material-ui';
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar
let Colors = mui.Styles.Colors

// Dependent component
import OrganizationMeta from './organization_meta.es6.js'
import NoContent from './no_content.es6.js'
import Jumbotron from './jumbotron.es6.js'
import Organization from './organization.es6.js'

// Define component
const OrganizationsList = React.createClass({

  getInitialState () {
    return {
      organizations: [],
      loaded: false
    };
  },

  fetchOrganizations() {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON(this.props.path, function(json, textStatus) {
      this.setState({organizations: json, loaded: true});
    }.bind(this));
  },

  componentDidMount() {
    if(this.isMounted()) {
      this.fetchOrganizations();
    }
  },

  render() {

    let listContainerStyle = {
      paddingTop: '50px'
    };

    let subHeaderStyles = {
      fontSize: '25px',
      marginBottom: '20px',
      padding: '0'
    };

    return (
        <div className="organizations-list">
          <header className="header header--bg">
            <div className="container">
              <Jumbotron />
            </div>
          </header>
          <div className="container" style={listContainerStyle}>
            <List subheader={this.props.meta? "All companies" : "Popular Companies"} subheaderStyle={subHeaderStyles}>
              <Loader loaded={this.state.loaded}>
                {this.state.organizations.map(org => (
                  <Organization org={org} key={org.id} meta={this.props.meta} />
                ))}
              </Loader>
            </List>
          </div>
        </div>
      );
  }

});

module.exports = OrganizationsList;
