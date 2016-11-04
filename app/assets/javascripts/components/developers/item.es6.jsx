/* global Routes document $ */

// Modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { css } from 'aphrodite';

// Child Components
import Meta from './meta.es6';
import Links from './links.es6';
import Name from './name.es6';
import Location from './location.es6';
import Bio from './bio.es6';
import Company from './company.es6';
import ProfilePopup from './popup.es6';
import LoadingComponent from '../shared/loadingComponent';
import ErrorComponent from '../shared/errorComponent';

// Route
import developerRoute from '../../routes/developerRoute.es6';

// StyleSheets
import badgeStyles from '../styles/badges.es6';

class Developer extends Component {
  constructor(props) {
    super(props);
    this.openPopup = this.openPopup.bind(this);
  }

  openPopup() {
    const { developer } = this.props;
    developerRoute.params = {};
    developerRoute.params.id = developer.login;

    ReactDOM.render(
      <Relay.Renderer
        Container={ProfilePopup}
        queryConfig={developerRoute}
        environment={Relay.Store}
        render={({ props, error, retry }) => {
          if (props) {
            return (
              <ProfilePopup
                {...props}
              />
            );
          } else if (error) {
            return <ErrorComponent retry={retry} />;
          }
          return <LoadingComponent />;
        }}
      />,
      document.getElementById('popups-container')
    );
  }


  render() {
    const { developer } = this.props;

    return (
      <div
        className={
          `profile--item ${developer.premium ? 'premium' : ''}`
        }
      >
        <ListItem
          innerDivStyle={{ padding: '20px 10px 16px 115px' }}
          onClick={this.openPopup}
          leftAvatar={
            <div className="avatar">
              {developer.hireable ?
                <div
                  className={
                    css(
                      badgeStyles.badge,
                      badgeStyles.hireable
                    )
                  }
                > H </div> : ''
              }
              <Avatar src={developer.avatar_url} size={80} />
            </div>
          }
          disabled
          secondaryTextLines={1}
        >
          <Name developer={developer} />
          <Location developer={developer} />
          <Company developer={developer} />
          <div style={{ position: 'absolute', right: 0, top: '10px' }}>
            <Meta developer={developer} />
          </div>
          <Bio developer={developer} />
          <Links developer={developer} />
          <div className="clearfix" />
        </ListItem>
      </div>
    );
  }
}

Developer.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperContainer = Relay.createContainer(Developer, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        avatar_url,
        hireable,
        login,
        premium,
        ${Name.getFragment('developer')},
        ${Company.getFragment('developer')},
        ${Links.getFragment('developer')},
        ${Meta.getFragment('developer')},
        ${Location.getFragment('developer')},
        ${Bio.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperContainer;
