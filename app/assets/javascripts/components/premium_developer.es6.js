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
import PremiumDeveloperStatus from './premium_developer_status.es6.js'
import DeveloperMeta from './developer_meta.es6.js'

const developerStyle = {
  fontWeight: '500',
};

const paragraphStyles = {
  height: 'auto'
};

// Define component
const PremiumDeveloper = React.createClass({
  onFocus(event) {
    $(event.target).css({
      backgroundColor: '#f2f2f2',
    });
  },

  render() {
    return (
      <div style={developerStyle} className="developer developer--item premium" id={"developer_" + this.props.developer.id}>
        <ListItem
          leftAvatar={<Avatar src={this.props.developer.data.avatar_url} />}
          disabled={true}
          primaryText={this.props.developer.name}
          style={paragraphStyles}
          onKeyboardFocus={this.onFocus}
          rightIconButton={
          <div className="pull-right">
            <DeveloperMeta followers={this.props.developer.data.followers} gists={this.props.developer.data.public_gists} repos={this.props.developer.data.public_repos} />
          </div>
          }
          secondaryText={
          <PremiumDeveloperStatus developer={this.props.developer} />
          }
          secondaryTextLines={1}
        />
      </div>
    );
  },
});

module.exports = PremiumDeveloper;
