// Require React
React = require('react/addons');
const createDOMPurify = require('dompurify');
const classNames = require('classnames');
const Cookies = require('js-cookie');

// Material UI
import mui from 'material-ui';
const Colors = mui.Styles.Colors;

// Define component
const DeveloperStatus= React.createClass({
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
      this.props.developer.bio,
      { ALLOWED_TAGS: ['b', 'i'] }
    );

    return (
        <div style={paragraphStyles}>
          <span style={{color: '#333', fontWeight: '400'}}>
            <small>{this.props.developer.location}</small>
          </span><br/>

          {this.props.developer.bio? <span style={bioStyles} className="bio" dangerouslySetInnerHTML={{ __html:bio }}></span> : ""}

          <div style={{marginTop: '10px', fontWeight: '400', maxWidth: '80%'}} className="badges">
            {this.props.developer.email && this.props.developer.hireable ? <span onClick={this.openMail} style={$.extend({}, badgeStyles, emailStyles)}>
              Email
            </span> : '' }
            {this.props.developer.company ? <span style={badgeStyles} className="company_shown">
              {this.props.developer.company}
            </span> : "" }

            {this.props.developer.hireable ? <span style={badgeStyles} className="available">
              Hireable
            </span> : !this.props.developer.company ? <span style={badgeStyles} className="may_available">
              May be hireable
            </span> : ''}
          </div>

          <div className="social-icons">
            <span
              onClick={this.openUrl.bind(this, location.protocol + '//' + location.host + '/developers/' + this.props.developer.login)}
              className="show-profile"
            >
              Profile
            </span>

            {this.props.developer.blog ? <span
              onClick={this.openUrl.bind(this, this.props.developer.blog)}
              className="show-website"
            >
              Website
            </span> : ''}

            <span
              onClick={this.openUrl.bind(this, this.props.developer.html_url)}
              className="show-github"
            >
              Github
            </span>
          </div>
        </div>
      );
  },

  openUrl(url) {
    var clicksCookieName =  Cookies.get('visitor') + '-clicks';
    var clicksValue = parseInt(Cookies.get(clicksCookieName)) + 1;

    Cookies.set(
      clicksCookieName,
      clicksValue
    );

    if ($('meta[name="env"]').data('env') === "production") {
      ga(
        'send',
        'event',
        'link',
        'click',
        'Clicked link',
        clicksValue,
        {
          user_id: Cookies.get('visitor'),
        },
      );
    }

    var urlWithProtocol = url.match(/^http[s]*:\/\//) ? url : 'http://' + url;
    // open with protocol
    window.open(urlWithProtocol);
  },

  openMail(e) {
    e.preventDefault();
    var emailClicksCookieName =  Cookies.get('visitor') + '-email-clicks';
    var emailClicksValue = parseInt(Cookies.get(emailClicksCookieName)) + 1;

    Cookies.set(
      emailClicksCookieName,
      emailClicksValue
    );

    if ($('meta[name="env"]').data('env') === "production") {
      ga(
        'send',
        'event',
        'email',
        'click',
        'Clicked email',
        emailClicksValue,
        {
          email: this.props.developer.email,
          user_id: Cookies.get('visitor'),
        },
      );
    }

    window.location.href = 'mailto:' + this.props.developer.email
    e.stopPropagation();
  }

});

module.exports = DeveloperStatus;