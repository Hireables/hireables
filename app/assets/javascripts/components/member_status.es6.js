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
    };

    const bioStyles = {
      fontSize: '14px',
      maxWidth: '70%',
      display: 'block',
      marginTop: '10px',
      fontWeight: '400',
    };

    const badgeStyles = {
      fontSize: '11px',
      lineHeight: '22px',
      padding: '2px 8px',
      marginRight: '5px',
      maxWidth: '100px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: Colors.white,
      overflow: 'hidden',
      fontWeight: 'bold',
      display: 'inline-block',
      borderRadius: 2
    };

    const emailStyles = {
      backgroundColor: '#555',
      cursor: 'pointer'
    };

    const bio = createDOMPurify.sanitize(
      this.props.member.bio,
      { ALLOWED_TAGS: ['b', 'i'] }
    );

    return (
        <div style={paragraphStyles}>
          <span style={{color: '#333', fontWeight: '400'}}>
            <small>{this.props.member.location}</small>
          </span><br/>

          {this.props.member.bio? <span style={bioStyles} className="bio" dangerouslySetInnerHTML={{ __html:bio }}></span> : ""}

          <div style={{marginTop: '10px', fontWeight: '400', maxWidth: '80%'}} className="badges">
            {this.props.member.email && this.props.member.hireable ? <span onClick={this.openMail} style={$.extend({}, badgeStyles, emailStyles)}>
              Email
            </span> : '' }
            {this.props.member.company ? <span style={badgeStyles} className="company_shown">
              {this.props.member.company}
            </span> : "" }

            {this.props.member.hireable ? <span style={badgeStyles} className="available">
              Hireable
            </span> : !this.props.member.company ? <span style={badgeStyles} className="may_available">
              May be hireable
            </span> : ''}
          </div>

          <div className="social-icons">
            <span
              onClick={this.openUrl.bind(this, location.protocol + '//' + location.host + '/members/' + this.props.member.login)}
              className="show-profile"
            >
              Profile
            </span>

            {this.props.member.blog ? <span
              onClick={this.openUrl.bind(this, this.props.member.blog)}
              className="show-website"
            >
              Website
            </span> : ''}

            <span
              onClick={this.openUrl.bind(this, this.props.member.html_url)}
              className="show-github"
            >
              Github
            </span>
          </div>
        </div>
      );
  },

  openUrl(url) {
    var urlWithProtocol = url.match(/^http[s]*:\/\//) ? url : 'http://' + url;
    // open with protocol
    window.open(urlWithProtocol);
  },

  openMail(e) {
    e.preventDefault();
    window.location.href = 'mailto:' + this.props.member.email
    e.stopPropagation();
  }

});

module.exports = MemberStatus;
