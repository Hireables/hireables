// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
var $ = require('jquery-browserify');

import OrganizationMeta from './organization_meta.es6.js'

let RaisedButton = mui.RaisedButton;
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors

// Define component
const OrganizationsList = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      organizations: []
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  fetchOrganizations() {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON('/organizations', function(json, textStatus) {
      this.setState({organizations: json});
    }.bind(this));
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
  },

  componentDidMount() {
    if(this.isMounted()) {
      this.fetchOrganizations();
    }
  },

  showOrganization(id) {
    Turbolinks.visit("/organizations/" + id);
  },

  render() {
    let listContainerStyle = {
      paddingTop: '50px'
    };

    return (
        <div className="organizations_show">
          <div className="container" style={listContainerStyle}>
            <List subheader="All companies">
              {this.state.organizations.map(org => (
                <div key={org.id} onClick={this.showOrganization.bind(this, org.login)}>
                  <ListItem
                    leftAvatar={<Avatar src={org.avatar_url} />}
                    primaryText={org.name || "No Name"}
                    rightIconButton={<div className="pull-right"><OrganizationMeta followers={org.followers} gists={org.public_gists} repos={org.public_repos} /></div>}
                    secondaryText={
                      <p>
                        <span style={{color: Colors.darkBlack}}>{org.login}</span><br/>
                        <div style={{color: Colors.grey600}} dangerouslySetInnerHTML={{__html: org.description}}>
                        </div>
                      </p>
                    }
                  secondaryTextLines={2} />
                  <ListDivider inset={true} />
                </div>
                ))}
            </List>
          </div>
        </div>
      );
  }

});

module.exports = OrganizationsList;
