// Require React
React = require('react/addons');
var classNames = require('classnames');

// Material UI
import mui from 'material-ui';
let Colors = mui.Styles.Colors;

// Define component
const MemberStatus= React.createClass({

  render() {

    let paragraphStyles = {
      height: 'auto',
      margin: '5px',
      marginLeft: '0px'
    }

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

    return (
        <p style={paragraphStyles}>
          <span style={{color: Colors.darkBlack}}>
            <small>{this.props.member.location}</small>
          </span><br/>
          {this.props.member.bio? <p dangerouslySetInnerHTML={{__html: this.props.member.bio}}>
          </p> : ""}
          <div style={{marginTop: '5px'}}>
            <span style={badgeStyles} className={availableClasses}>
             {this.props.member.hireable ? 'Available to hire' : 'Not Available' }
            </span>
            <span style={badgeStyles} className={companyGivenClasses}>
             {this.props.member.company ? this.props.member.company : 'Company unavailable' }
            </span>
          </div>
        </p>
      );
  },
});

module.exports = MemberStatus;
