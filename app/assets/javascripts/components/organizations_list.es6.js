// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog;
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors

import request from 'superagent';

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
    request
      .get('/organizations')
      .set('Accept', 'application/json')
      .end(function(err, res){
        this.setState({organizations: JSON.parse(res.text)});
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

  render() {
    let containerStyle = {
      width: '960px',
      margin: '0 auto',
      paddingTop: '100px'
    };

    let standardActions = [
      { text: 'Okay' }
    ];

    return (
        <div style={containerStyle}>
          <List subheader="Today">
            {this.state.organizations.map(org => (
              <div key={org.id}>
                <ListItem
                  leftAvatar={<Avatar src={org.avatar_url} />}
                  primaryText={org.login}
                  secondaryText={
                    <p dangerouslySetInnerHTML={{__html: org.description}}>
                    </p>
                  }
                  secondaryTextLines={2} />
                  <ListDivider inset={true} />
                </div>
              ))}
          </List>
        </div>
      );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }
});

module.exports = OrganizationsList;
