// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog;
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let rightIconMenu = mui.List.rightIconMenu;
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
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
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
            <ListItem
              leftAvatar={<Avatar src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" />}
              rightIconButton={rightIconMenu}
              primaryText="Brendan Lim"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Brunch this weekend?</span><br/>
                  I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2} />
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" />}
              rightIconButton={rightIconMenu}
              primaryText="me, Scott, Jennifer"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Summer BBQ</span><br/>
                  Wish I could come, but I&apos;m out of town this weekend.
                </p>
              }
              secondaryTextLines={2} />
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" />}
              rightIconButton={rightIconMenu}
              primaryText="Grace Ng"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Oui oui</span><br/>
                  Do you have any Paris recs? Have you ever been?
                </p>
              }
              secondaryTextLines={2} />
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" />}
              rightIconButton={rightIconMenu}
              primaryText="Kerem Suer"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Birthday gift</span><br/>
                  Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                </p>
              }
              secondaryTextLines={2} />
            <ListDivider inset={true} />
            <ListItem
              leftAvatar={<Avatar src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" />}
              rightIconButton={rightIconMenu}
              primaryText="Raquel Parrado"
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Recipe to try</span><br/>
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2} />
          </List>
        </div>
      );
  },

  _handleTouchTap() {
    this.refs.superSecretPasswordDialog.show();
  }
});

module.exports = OrganizationsList;
