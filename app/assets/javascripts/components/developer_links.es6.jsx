/* eslint-disable jsx-a11y/no-static-element-interactions, no-nested-ternary */
/* global $ ga location window Routes */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Cookies from 'js-cookie';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

class DeveloperLinks extends Component {
  static openUrl(url) {
    const clicksCookieName = `${Cookies.get('visitor')}-clicks`;
    const clicksValue = parseInt(Cookies.get(clicksCookieName), 0) + 1;

    Cookies.set(
      clicksCookieName,
      clicksValue
    );

    if ($('meta[name="env"]').data('env') === 'production') {
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

    const urlWithProtocol = url.match(/^http[s]*:\/\//) ? url : `http://${url}`;
    window.open(urlWithProtocol);
  }

  render() {
    const paragraphStyles = {
      height: 'auto',
      marginTop: '10px',
      marginLeft: '0px',
    };

    return (
      <div style={paragraphStyles} className="links">
        <div className="social-icons">
          {this.props.developer.email && this.props.developer.hireable ?
            <IconButton
              tooltip="Email"
              tooltipPosition="bottom-center"
              className="link-icon"
              target="_blank"
              rel="noopener noreferrer"
              tooltipStyles={{ top: '15px' }}
              style={{ color: '#555', padding: '0', marginRight: '10px', width: '24px', height: '24px' }}
              href={`mailto:${this.props.developer.email}`}
            >
              <FontIcon
                className="material-icons"
                color="#777"
                hoverColor="#333"
              >
                email
              </FontIcon>
            </IconButton> : ''
          }

          {this.props.developer.blog ?
            <IconButton
              tooltip="Website"
              tooltipPosition="bottom-center"
              className="link-icon"
              target="_blank"
              rel="noopener noreferrer"
              tooltipStyles={{ top: '15px' }}
              style={{ color: '#555', padding: '0', marginRight: '10px', width: '24px', height: '24px' }}
              href={this.props.developer.blog}
            >
              <FontIcon
                className="material-icons"
                color="#777"
                hoverColor="#333"
              >
                web
              </FontIcon>
            </IconButton> : ''
          }

          <IconButton
            disableTouchRipple
            target="_blank"
            rel="noopener noreferrer"
            tooltip="Github profile"
            style={{ padding: '0', marginRight: '10px', width: '24px', height: '24px' }}
            tooltipStyles={{ top: '15px' }}
            tooltipPosition="bottom-center"
            href={this.props.developer.html_url}
          >
            <FontIcon
              className="muidocs-icon-custom-github link-icon"
              color="#777"
              hoverColor="#333"
            />
          </IconButton>


          {this.props.developer.remote ?
            <IconButton
              tooltip="Prefer remote"
              style={{ padding: '0', marginRight: '10px', width: '24px', height: '24px' }}
              tooltipStyles={{ top: '15px' }}
              tooltipPosition="bottom-center"
              href="#"
              disabled
            >
              <FontIcon
                className="material-icons"
                color="#777"
                hoverColor="#333"
              >
                settings_remote
              </FontIcon>
            </IconButton> : ''
          }

          {this.props.developer.relocate ?
            <IconButton
              tooltip="Can relocate"
              style={{ padding: '0', marginRight: '10px', width: '24px', height: '24px' }}
              tooltipStyles={{ top: '15px' }}
              tooltipPosition="bottom-center"
              href="#"
              disabled
            >
              <FontIcon
                className="material-icons"
                color="#777"
                hoverColor="#333"
              >
                location_on
              </FontIcon>
            </IconButton> : ''
          }

          {this.props.developer.company ?
            <IconButton
              tooltip={this.props.developer.company}
              style={{ padding: '0', marginRight: '10px', width: '24px', height: '24px' }}
              tooltipStyles={{ top: '15px' }}
              tooltipPosition="bottom-center"
              href="#"
              disabled
            >
              <FontIcon
                className="material-icons"
                color="#777"
                hoverColor="#333"
              >
                work
              </FontIcon>
            </IconButton> : ''
          }
        </div>
      </div>
    );
  }
}

DeveloperLinks.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperLinksContainer = Relay.createContainer(
  DeveloperLinks, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          blog,
          login,
          html_url,
          email,
          remote,
          company,
          premium,
          relocate,
          html_url,
          hireable,
        }
      `,
    },
  }
);

export default DeveloperLinksContainer;
