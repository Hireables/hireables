/* eslint-disable jsx-a11y/no-static-element-interactions, no-nested-ternary */
/* global $ ga location window Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import { css } from 'aphrodite';

// Stylesheet
import iconStyles from '../styles/icons.es6';

class Links extends Component {
  static openUrl(event, url) {
    event.preventDefault();
    const urlWithProtocol = url.match(/^http[s]*:\/\//) ? url : `http://${url}`;
    window.open(urlWithProtocol);
    event.stopPropagation();
  }

  constructor(props) {
    super(props);
    this.openMail = this.openMail.bind(this);
  }

  openMail(e) {
    e.preventDefault();
    window.location.href = `mailto:${this.props.developer.email}`;
    e.stopPropagation();
  }

  render() {
    return (
      <div className={css(iconStyles.links)}>
        {this.props.developer.email && this.props.developer.hireable ?
          <IconButton
            tooltip="Email"
            tooltipPosition="bottom-center"
            className={css(iconStyles.linkIcon, iconStyles.inline)}
            tooltipStyles={{ top: '15px' }}
            onClick={this.openMail}
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
            target="_blank"
            rel="noopener noreferrer"
            className={css(iconStyles.linkIcon, iconStyles.inline)}
            tooltipStyles={{ top: '15px' }}
            onClick={event => Links.openUrl(event, this.props.developer.blog)}
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
          tooltip="Github"
          className={css(iconStyles.linkIcon, iconStyles.inline)}
          tooltipStyles={{ top: '15px' }}
          tooltipPosition="bottom-center"
          onClick={event => Links.openUrl(event, this.props.developer.html_url)}
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
            tooltipStyles={{ top: '15px' }}
            tooltipPosition="bottom-center"
            style={{ cursor: 'not-allowed' }}
            className={css(iconStyles.linkIcon, iconStyles.inline)}
            onClick={event => event.stopPropagation()}
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
            tooltipStyles={{ top: '15px' }}
            tooltipPosition="bottom-center"
            style={{ cursor: 'not-allowed' }}
            className={css(iconStyles.linkIcon, iconStyles.inline)}
            onClick={event => event.stopPropagation()}
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
            tooltip={`Works at ${this.props.developer.company}`}
            tooltipStyles={{ top: '15px' }}
            tooltipPosition="bottom-center"
            style={{ cursor: 'not-allowed' }}
            className={css(iconStyles.linkIcon, iconStyles.inline)}
            onClick={event => event.stopPropagation()}
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

        {this.props.developer.linkedin ?
          <IconButton
            disableTouchRipple
            target="_blank"
            rel="noopener noreferrer"
            tooltip="Linkedin"
            className={css(iconStyles.linkIcon, iconStyles.inline)}
            tooltipStyles={{ top: '15px' }}
            tooltipPosition="bottom-center"
            onClick={event => Links.openUrl(event, this.props.developer.linkedin)}
          >
            <SvgIcon color="#777" viewBox="0 0 512 512">
              <path
                d="M186.4 142.4c0 19-15.3 34.5-34.2 34.5
                  -18.9 0-34.2-15.4-34.2-34.5 0-19 15.3-34.5 34.2-34.5C171.1
                  107.9 186.4 123.4 186.4 142.4zM181.4
                  201.3h-57.8V388.1h57.8V201.3zM273.8
                  201.3h-55.4V388.1h55.4c0 0 0-69.3 0-98 0-26.3
                  12.1-41.9 35.2-41.9 21.3 0 31.5 15 31.5 41.9 0 26.9 0 98
                  0 98h57.5c0
                  0 0-68.2 0-118.3 0-50-28.3-74.2-68-74.2 -39.6
                  0-56.3 30.9-56.3 30.9v-25.2H273.8z"
              />
            </SvgIcon>
          </IconButton> : ''
        }
      </div>
    );
  }
}

Links.propTypes = {
  developer: React.PropTypes.object,
};

const LinksContainer = Relay.createContainer(
  Links, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          blog,
          login,
          html_url,
          email,
          remote,
          company,
          linkedin,
          premium,
          relocate,
          html_url,
          hireable,
        }
      `,
    },
  }
);

export default LinksContainer;
