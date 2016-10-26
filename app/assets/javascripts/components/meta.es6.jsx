import React from 'react';
import Relay from 'react-relay';
import { grey600 } from 'material-ui/styles/colors';

const Meta = props => (
  <div className="stats">
    <ul className="no-style fs-14 hidden-sm" style={{ color: grey600, padding: 0 }}>
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

Meta.propTypes = {
  developer: React.PropTypes.object,
};

const MetaContainer = Relay.createContainer(Meta, {
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

export default MetaContainer;
