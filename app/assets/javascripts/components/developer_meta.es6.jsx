import React from 'react';
import { grey600 } from 'material-ui/styles/colors';

const DeveloperMeta = props => (
  <div className={props.positionClass}>
    <ul className="no-style fs-14 hidden-sm" style={{ color: grey600 }}>
      <li className="text-center inline m-r-20">
        <span>Followers</span>
        <span className="block m-t-5">{props.followers}</span>
      </li>
      <li className="text-center inline m-r-20">
        <span>Gists</span>
        <span className="block m-t-5">{props.gists}</span>
      </li>
      <li className="text-center inline m-r-20">
        <span>Repos</span>
        <span className="block m-t-5">{props.repos}</span>
      </li>
    </ul>
  </div>
);

DeveloperMeta.propTypes = {
  followers: React.PropTypes.number,
  gists: React.PropTypes.number,
  repos: React.PropTypes.number,
};

export default DeveloperMeta;
