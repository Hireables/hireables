// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
var $ = require('jquery-browserify');
var Loader = require('react-loader');

// Dependent component
import OrganizationMeta from './organization_meta.es6.js'
import NoContent from './no_content.es6.js'
import Jumbotron from './jumbotron.es6.js'
import Search from './search.es6.js'
import Pagination from './pagination.es6.js'

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
      organizations: [],
      loaded: false
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
    $.getJSON(this.props.path, function(json, textStatus) {
      this.setState({organizations: json, loaded: true});
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
            <h3 className="bold">Enter company name to search</h3>
            <div className="organizations-list organizations--small">
              <Search action= {"/organizations"} />
            </div>

            <List subheader={this.props.meta? "All companies" : "Popular Companies"} subheaderStyle={subHeaderStyles}>
              <Loader loaded={this.state.loaded}>
                {this.state.organizations.map(org => (
                  <div key={org.id} onClick={this.showOrganization.bind(this, org.login)}>
                    <ListItem
                      leftAvatar={<Avatar src={org.avatar_url} />}
                      primaryText={org.name || "No Name"}
                      rightIconButton={this.props.meta?
                        <div className="pull-right">
                          <OrganizationMeta followers={org.followers} gists={org.public_gists} repos={org.public_repos} />
                        </div> : <NoContent />
                      }
                      secondaryText={
                        <p>
                          <span style={{color: Colors.darkBlack}}>{org.login}</span><br/>
                          <div style={{color: Colors.grey600, fontSize: '13px'}} dangerouslySetInnerHTML={{__html: org.description}}>
                          </div>
                        </p>
                      }
                    secondaryTextLines={2} />
                    <ListDivider inset={true} />
                  </div>
                  ))}
                </Loader>
            </List>
          </div>
        </div>
      );
  }

});

module.exports = OrganizationsList;
