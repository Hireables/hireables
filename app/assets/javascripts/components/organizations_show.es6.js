// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
var $ = require('jquery-browserify')

import OrganizationMeta from './organization_meta.es6.js'

let RaisedButton = mui.RaisedButton;
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar;
let IconButton = mui.IconButton;
let FontIcon = mui.FontIcon;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors

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

  fetchOrganization(id) {
    $.ajaxSetup({
      cache: false
    });
    $.getJSON('/organizations/' + id, function(json, textStatus) {
      this.setState({
        org: JSON.parse(json.org),
        members: JSON.parse(json.members)
      });
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
      this.fetchOrganization(this.state.id);
    }
  },

  render() {

    let containerStyle = {
      paddingTop: '50px'
    };

    let subHeaderStyles = {
      fontSize: '25px',
      color: Colors.darkBlack
    }

    let overrideListStyle = {
      backgroundColor: 'transparent',
      paddingTop: '0',
      paddingBottom: '0'
    }

    let wrapperStyle = {
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center'
    }

    let badgeStyles = {
      fontSize: '10px',
      lineHeight: '22px',
      padding: '5px 8px',
      marginRight: '5px',
      color: Colors.white,
      overflow: 'hidden',
      borderRadius: 2,
      userSelect: 'none',
      backgroundColor: Colors.grey700
    }

    let paragraphStyles = {
      height: 'auto'
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
                <OrganizationMeta followers={this.state.org.followers} gists={this.state.org.public_gists} repos={this.state.org.public_repos} />
              </div>
            </div>
          </header>
          <List subheader="Members" className="container" style={containerStyle}>
            {this.state.members.map(member => (
              <div key={member.id} className="members">
                <ListItem
                  leftAvatar={<Avatar src={member.avatar_url} />}
                  primaryText={member.name}
                  style={paragraphStyles}
                  rightIconButton={<div className="pull-right"><OrganizationMeta followers={member.followers} gists={member.public_gists} repos={member.public_repos} /></div>}
                  secondaryText={
                    <p style={paragraphStyles}>
                    <span style={{color: Colors.darkBlack}}>{member.login}</span><br/>
                      <p dangerouslySetInnerHTML={{__html: member.description}}>
                      </p>
                      <span style={badgeStyles}>{member.hireable ? 'Available to hire' : 'Not Available' }</span>
                      <span style={badgeStyles}>{member.company ? member.company : 'Not given' }</span>
                    </p>
                  }
                  secondaryTextLines={2} />
                  <ListDivider inset={true} />
              </div>
              ))}
          </List>
        </div>
      );
  }

});

module.exports = OrganizationsShow;
