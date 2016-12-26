/* eslint-disable jsx-a11y/no-static-element-interactions, no-nested-ternary */
/* global $ ga location window Routes document */

// Modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { css } from 'aphrodite';
import SvgIcon from 'material-ui/SvgIcon';

// Mail composer
import PopupComposer from '../email/popupComposer.es6';
import composerRoute from '../../routes/composerRoute.es6';
import LoadingComponent from '../shared/loadingComponent';
import ErrorComponent from '../shared/errorComponent';

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
    this.openComposer = this.openComposer.bind(this);
  }

  openMail(e) {
    e.preventDefault();
    window.location.href = `mailto:${this.props.developer.email}`;
    e.stopPropagation();
  }

  openComposer(event) {
    event.preventDefault();
    composerRoute.params = {};
    composerRoute.params.id = 'sentbox';
    composerRoute.params.login = this.props.developer.login;

    ReactDOM.render(
      <Relay.Renderer
        Container={PopupComposer}
        queryConfig={composerRoute}
        environment={Relay.Store}
        render={({ props, error, retry }) => {
          if (props) {
            return <PopupComposer {...props} />;
          } else if (error) {
            return <ErrorComponent retry={retry} />;
          }
          return <LoadingComponent />;
        }}
      />,
      document.getElementById('popups-container')
    );
    event.stopPropagation();
  }


  render() {
    return (
      <div className="links" style={{ marginTop: 10 }}>
        <div className={css(iconStyles.links)}>
          {this.props.signedIn &&
            this.props.developer.email &&
            this.props.developer.hireable ?
              <Chip
                labelStyle={{ fontSize: 14 }}
                className={css(iconStyles.linkIcon, iconStyles.hover)}
                onClick={event =>
                  (this.props.developer.premium ?
                    this.openComposer(event) : this.openMail(event))
                }
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
              labelStyle={{ fontSize: 14 }}
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
            labelStyle={{ fontSize: 14 }}
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

          {this.props.developer.linkedin ?
            <Chip
              labelStyle={{ fontSize: 15, paddingLeft: 5 }}
              className={css(iconStyles.linkIcon, iconStyles.hover)}
              style={{ cursor: 'pointer' }}
              onClick={event => Links.openUrl(event, this.props.developer.linkedin)}
            >
              <Avatar
                className={css(iconStyles.iconAvatar)}
                icon={
                  (
                    <SvgIcon
                      color="rgb(91, 152, 224)"
                      viewBox="0 0 512 512"
                      style={{ fill: 'rgb(91, 152, 224)' }}
                    >
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
                  )
                }
              />
              Linkedin
            </Chip> : ''
          }
        </div>
      </div>
    );
  }
}

Links.propTypes = {
  developer: React.PropTypes.object,
  signedIn: React.PropTypes.bool,
};

const LinksContainer = Relay.createContainer(
  Links, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          id,
          blog,
          login,
          premium,
          html_url,
          email,
          html_url,
          linkedin,
          hireable,
        }
      `,
    },
  }
);

export default LinksContainer;
