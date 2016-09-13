// Require React
React = require('react/addons');

// Material UI
import mui from 'material-ui';
let Colors = mui.Styles.Colors;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar

// Dependent component
import NoContent from './no_content.es6.js'
import DeveloperStatus from './developer_status.es6.js'
import DeveloperMeta from './developer_meta.es6.js'

const developerStyle = {
  fontWeight: '500',
};

const paragraphStyles = {
  height: 'auto'
};

// Define component
const Developer = React.createClass({
  onFocus(event) {
    $(event.target).css({
      backgroundColor: '#f2f2f2',
    });
  },

  render() {
    return (
      <div style={developerStyle} className="developer developer--item" id={"developer_" + this.props.developer.id}>
       <ListItem
         leftAvatar={<Avatar src={this.props.developer.avatar_url} />}
         disabled={true}
         primaryText={this.props.developer.name}
         style={paragraphStyles}
         onKeyboardFocus={this.onFocus}
         rightIconButton={
          <div className="pull-right">
            <DeveloperMeta followers={this.props.developer.followers} gists={this.props.developer.public_gists} repos={this.props.developer.public_repos} />
          </div>
          }
         secondaryText={
          <DeveloperStatus developer={this.props.developer} />
         }
         secondaryTextLines={1} />
      </div>
    );
  },
});

module.exports = Developer;
