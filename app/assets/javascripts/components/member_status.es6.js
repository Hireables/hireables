// Require React
React = require('react/addons');
const createDOMPurify = require('dompurify');
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

    let badgeStyles = {
      fontSize: '11px',
      lineHeight: '22px',
      padding: '5px 8px',
      marginRight: '5px',
      color: Colors.white,
      overflow: 'hidden',
      width: '100%',
      borderRadius: 2
    }

    let emailStyles = {
      backgroundColor: Colors.yellow900,
      cursor: 'pointer'
    }

    const bio = createDOMPurify.sanitize(this.props.member.bio)

    return (
        <p style={paragraphStyles}>
          <span style={{color: Colors.darkBlack}}>
            <small>{this.props.member.location}</small>
          </span><br/>
          {this.props.member.bio? <p dangerouslySetInnerHTML={{__html:bio }}>
          </p> : ""}
          <div style={{marginTop: '5px'}}>
            {this.props.member.email ? <span onClick={this._openMail} style={$.extend({}, badgeStyles, emailStyles)}>
              Email
            </span> : "" }
            {this.props.member.hireable ? <span style={badgeStyles} className="available">
              Available to hire
            </span> : "" }

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
