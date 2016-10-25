import React from 'react';
import Relay from 'react-relay';
import { grey600 } from 'material-ui/styles/colors';

const DeveloperMeta = props => (
  <div className="stats">
    <ul className="no-style fs-14 hidden-sm" style={{ color: grey600 }}>
      <li className="text-center inline m-r-20">
        <span>Followers</span>
        <span className="block m-t-5">{props.developer.followers}</span>
      </li>
      <li className="text-center inline m-r-20">
        <span>Gists</span>
        <span className="block m-t-5">{props.developer.public_gists}</span>
      </li>
      <li className="text-center inline m-r-20">
        <span>Repos</span>
        <span className="block m-t-5">{props.developer.public_repos}</span>
      </li>
    </ul>
  </div>
);

DeveloperMeta.propTypes = {
  positionClass: React.PropTypes.string,
  developer: React.PropTypes.object,
};

const DeveloperMetaContainer = Relay.createContainer(DeveloperMeta, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        followers,
        public_gists,
        public_repos,
      }
    `,
  },
});

export default DeveloperMetaContainer;
