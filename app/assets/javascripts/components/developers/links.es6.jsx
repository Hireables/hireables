/* eslint-disable jsx-a11y/no-static-element-interactions, no-nested-ternary */
/* global $ ga location window Routes */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
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
      <div className="links">
        <div className={css(iconStyles.links)}>
          {this.props.developer.email && this.props.developer.hireable ?
            <Chip
              labelStyle={{ fontSize: 15, paddingLeft: 5 }}
              className={css(iconStyles.linkIcon, iconStyles.hover)}
              onClick={this.openMail}
              style={{ cursor: 'pointer' }}
            >
              <Avatar
                className={css(iconStyles.iconAvatar)}
                icon={
                  <FontIcon
                    className={`material-icons ${css(iconStyles.chipIcon)}`}
                  >email
                  </FontIcon>
                }
              />
              Email
            </Chip> : ''
          }

          {this.props.developer.blog ?
            <Chip
              labelStyle={{ fontSize: 15, paddingLeft: 5 }}
              className={css(iconStyles.linkIcon, iconStyles.hover)}
              style={{ cursor: 'pointer' }}
              onClick={event => Links.openUrl(event, this.props.developer.blog)}
            >
              <Avatar
                className={css(iconStyles.iconAvatar)}
                icon={
                  <FontIcon
                    className={`material-icons ${css(iconStyles.chipIcon)}`}
                  >web</FontIcon>
                }
              />
              Website
            </Chip> : ''
          }

          <Chip
            labelStyle={{ fontSize: 15, paddingLeft: 5 }}
            className={css(iconStyles.linkIcon, iconStyles.hover)}
            style={{ cursor: 'pointer' }}
            onClick={event => Links.openUrl(event, this.props.developer.html_url)}
          >
            <Avatar
              className={css(iconStyles.iconAvatar)}
              icon={
                <FontIcon
                  className={`muidocs-icon-custom-github link-icon ${css(iconStyles.chipIcon)}`}
                />
              }
            />
            Github
          </Chip>

          {this.props.developer.remote ?
            <Chip
              labelStyle={{ fontSize: 15, paddingLeft: 5 }}
              className={css(iconStyles.linkIcon)}
            >
              <Avatar
                className={css(iconStyles.iconAvatar)}
                icon={
                  <FontIcon
                    className={`material-icons ${css(iconStyles.chipIcon)}`}
                  >settings_remote</FontIcon>
                }
              />
              Remote
            </Chip> : ''
          }

          {this.props.developer.relocate ?
            <Chip
              labelStyle={{ fontSize: 15, paddingLeft: 5 }}
              className={css(iconStyles.linkIcon)}
            >
              <Avatar
                className={css(iconStyles.iconAvatar)}
                icon={
                  <FontIcon
                    className={`material-icons ${css(iconStyles.chipIcon)}`}
                  >location_on</FontIcon>}
              />
              Relocate
            </Chip> : ''
          }
        </div>
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
