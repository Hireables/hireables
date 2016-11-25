/* global Routes window document $ */

// Modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

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
import Actions from './actions.es6';

// Route
import developerRoute from '../../routes/developerRoute.es6';

// StyleSheets
import '../styles/badges.sass';

// Utils
import CurrentUser from '../../helpers/currentUser.es6';

const currentUser = new CurrentUser();

class Developer extends Component {
  constructor(props) {
    super(props);
    this.openPopup = this.openPopup.bind(this);
    this.prefetch = this.prefetch.bind(this);
    this.clearPrefetch = this.clearPrefetch.bind(this);
    this.prefetcher = null;
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
                signedIn={this.props.signedIn}
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

  prefetch() {
    if (this.prefetcher === null) {
      this.prefetcher = setTimeout(() => {
        $.getJSON(Routes.developer_path(this.props.developer.login));
      }, 1000);
    }
  }

  clearPrefetch() {
    window.clearTimeout(this.prefetcher);
  }

  render() {
    const { developer, signedIn } = this.props;

    return (
      <div
        onMouseOver={this.prefetch}
        onMouseLeave={this.clearPrefetch}
        onClick={this.openPopup}
        className={
          `profile--item ${developer.premium ? 'premium' : ''}`
        }
      >
        <ListItem
          className="profile--list-item"
          innerDivStyle={{ padding: '30px 10px 16px 125px' }}
          leftAvatar={
            <div className="avatar" style={{ top: 20, textAlign: 'center' }}>
              {developer.hireable ?
                <div className="badge hireable"> H
                <span className="full">ireable</span></div> :
                !developer.company ?
                  <div className="badge hireable maybe"> M
                  <span className="full">ay be hireable</span></div> : ''
              }
              <Avatar src={developer.avatar_url} size={80} />
              {currentUser.isEmployer ? <Actions developer={developer} /> : ''}
            </div>
          }
          disabled
          secondaryTextLines={1}
        >
          <Name developer={developer} />
          <div
            className="company-location"
            style={{ display: 'flex', marginTop: 5 }}
          >
            <Location developer={developer} />
            <Company developer={developer} />
          </div>
          <div style={{ position: 'absolute', right: 0, top: '10px' }}>
            <Meta developer={developer} />
          </div>
          <Bio developer={developer} />
          <Links developer={developer} signedIn={signedIn} />
          <div className="clearfix" />
          {developer.premium ?
            <div className="premium-badge">
              Premium
            </div> : ''
          }
        </ListItem>
      </div>
    );
  }
}

Developer.propTypes = {
  developer: React.PropTypes.object,
  signedIn: React.PropTypes.bool,
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
        email,
        company,
        ${Name.getFragment('developer')},
        ${Company.getFragment('developer')},
        ${Links.getFragment('developer')},
        ${Meta.getFragment('developer')},
        ${Location.getFragment('developer')},
        ${Bio.getFragment('developer')},
        ${Actions.getFragment('developer')}
      }
    `,
  },
});

export default DeveloperContainer;
