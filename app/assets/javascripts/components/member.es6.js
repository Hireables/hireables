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

// Define component
const Member = React.createClass({

  render() {

    let paragraphStyles = {
      height: 'auto'
    }

    return (
      <div className="member" id={"member_" + this.props.member.id}>
       <ListItem
         leftAvatar={<Avatar src={this.props.member.avatar_url} />}
         onClick={this._showMember.bind(this, this.props.member.login)}
         primaryText={this.props.member.name}
         style={paragraphStyles}
         rightIconButton={
          <div className="pull-right">
            <MemberMeta followers={this.props.member.followers} gists={this.props.member.public_gists} repos={this.props.member.public_repos} />
          </div>
          }
         secondaryText={
          <MemberStatus member={this.props.member} />
         }
         secondaryTextLines={1} />
         <ListDivider inset={true} />
      </div>
    );
  },

  _showMember(id) {
    Turbolinks.visit("/members/" + id);
  }

});

module.exports = Member;
