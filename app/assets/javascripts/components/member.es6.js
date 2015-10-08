// Require React
React = require('react/addons');
var classNames = require('classnames');

// Material UI
import mui from 'material-ui';
let Colors = mui.Styles.Colors;
let ListItem = mui.ListItem;
let ListDivider = mui.ListDivider;
let Avatar = mui.Avatar

// Dependent component
import NoContent from './no_content.es6.js'
import OrganizationMeta from './organization_meta.es6.js'

// Define component
const Member = React.createClass({

  render() {

    var availableClasses = classNames({
      available: this.props.member.hireable,
      not_available: !this.props.member.hireable
    });

    var companyGivenClasses = classNames({
      company_shown: this.props.member.company,
      company_hidden: !this.props.member.company
    });

    let badgeStyles = {
      fontSize: '10px',
      lineHeight: '22px',
      padding: '5px 8px',
      marginRight: '5px',
      color: Colors.white,
      overflow: 'hidden',
      borderRadius: 2
    }

    let paragraphStyles = {
      height: 'auto'
    }

    return (
       <div className="members">
         <ListItem
           leftAvatar={<Avatar src={this.props.member.avatar_url} />}
           primaryText={this.props.member.name}
           style={paragraphStyles}
           rightIconButton={ this.props.meta?
            <div className="pull-right">
              <OrganizationMeta followers={this.props.member.followers} gists={this.props.member.public_gists} repos={this.props.member.public_repos} />
            </div> : <NoContent />
            }
           secondaryText={
             <p style={paragraphStyles}>
             <span style={{color: Colors.darkBlack}}>{this.props.member.login}</span><br/>
               <p dangerouslySetInnerHTML={{__html: this.props.member.description}}>
               </p>
               <span style={badgeStyles} className={availableClasses}>
                {this.props.member.hireable ? 'Available to hire' : 'Not Available' }
               </span>
               <span style={badgeStyles} className={companyGivenClasses}>
                {this.props.member.company ? this.props.member.company : 'Company unavailable' }
               </span>
             </p>
           }
           secondaryTextLines={1} />
           <ListDivider inset={true} />
       </div>
      );
  },
});

module.exports = Member;
