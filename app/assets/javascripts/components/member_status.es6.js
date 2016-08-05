// Require React
React = require('react/addons');
const createDOMPurify = require('dompurify');
const classNames = require('classnames');

// Material UI
import mui from 'material-ui';
const Colors = mui.Styles.Colors;

// Define component
const MemberStatus= React.createClass({

  render() {

    const paragraphStyles = {
      height: 'auto',
      margin: '5px',
      marginLeft: '0px'
    }

    const bioStyles = {
      fontSize: '14px',
      maxWidth: '100%',
    };

    const badgeStyles = {
      fontSize: '11px',
      lineHeight: '22px',
      padding: '5px 8px',
      marginRight: '5px',
      color: Colors.white,
      overflow: 'hidden',
      fontWeight: 'bold',
      width: '100%',
      borderRadius: 2
    }

    const emailStyles = {
      backgroundColor: '#555',
      cursor: 'pointer'
    }

    const bio = createDOMPurify.sanitize(this.props.member.bio, {ALLOWED_TAGS: ['b', 'i']});
    const isHireable = !this.props.member.company || this.props.member.hireable;

    return (
        <p style={paragraphStyles}>
          <span style={{color: Colors.darkBlack}}>
            <small>{this.props.member.location}</small>
          </span><br/>

          {this.props.member.bio? <p style={bioStyles} dangerouslySetInnerHTML={{ __html:bio }}></p> : ""}

          <div style={{marginTop: '5px'}}>
            {this.props.member.email ? <span onClick={this._openMail} style={$.extend({}, badgeStyles, emailStyles)}>
              Email
            </span> : '' }
            {this.props.member.hireable ? <span style={badgeStyles} className="available">
              Hireable
            </span> : !this.props.member.company ? <span style={badgeStyles} className="may_available">
              May be hireable
            </span> : ''}

            {this.props.member.company ? <span style={badgeStyles} className="company_shown">
              {this.props.member.company}
            </span> : "" }
          </div>
        </p>
      );
  },

  _openMail(e) {
    e.preventDefault();
    window.location.href = 'mailto:' + this.props.member.email
    e.stopPropagation();
  }

});

module.exports = MemberStatus;
