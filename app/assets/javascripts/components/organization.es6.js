// Require React
React = require('react/addons');

// Material UI
import mui from 'material-ui';
let Colors = mui.Styles.Colors;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let Avatar = mui.Avatar

// Dependent component
import NoContent from './no_content.es6.js'
import OrganizationMeta from './organization_meta.es6.js'

// Define component
const Organization = React.createClass({

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

  showOrganization(id) {
    Turbolinks.visit("/organizations/" + id);
  },

  render() {

    return (
         <div onClick={this.showOrganization.bind(this, this.props.org.login)}>
           <ListItem
             leftAvatar={<Avatar src={this.props.org.avatar_url} />}
             primaryText={this.props.org.name || "No Name"}
             rightIconButton={this.props.meta?
               <div className="pull-right">
                 <OrganizationMeta followers={this.props.org.followers} gists={this.props.org.public_gists} repos={this.props.org.public_repos} />
               </div> : <NoContent />
             }
             secondaryText={
               <p>
                 <span style={{color: Colors.darkBlack}}>{this.props.org.login}</span><br/>
                 <div style={{color: Colors.grey600, fontSize: '13px'}} dangerouslySetInnerHTML={{__html: this.props.org.description}}>
                 </div>
               </p>
             }
           secondaryTextLines={2} />
           <ListDivider inset={true} />
         </div>
      );
  },
});

module.exports = Organization;
