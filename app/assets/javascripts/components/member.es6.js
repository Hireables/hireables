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
import MemberStatus from './member_status.es6.js'
import MemberMeta from './member_meta.es6.js'

const memberStyle = {
  borderBottom: '1px solid #f2f2f2',
  fontWeight: '500',
};

const paragraphStyles = {
  height: 'auto'
};

// Define component
const Member = React.createClass({
  onFocus(event) {
    $(event.target).css({
      backgroundColor: '#f2f2f2',
    });
  },

  render() {
    return (
      <div style={memberStyle} className="member" id={"member_" + this.props.member.id}>
       <ListItem
         leftAvatar={<Avatar src={this.props.member.avatar_url} />}
         disabled={true}
         primaryText={this.props.member.name}
         className="member member--item"
         style={paragraphStyles}
         onKeyboardFocus={this.onFocus}
         rightIconButton={
          <div className="pull-right">
            <MemberMeta followers={this.props.member.followers} gists={this.props.member.public_gists} repos={this.props.member.public_repos} />
          </div>
          }
         secondaryText={
          <MemberStatus member={this.props.member} />
         }
         secondaryTextLines={1} />
      </div>
    );
  },
});

module.exports = Member;
