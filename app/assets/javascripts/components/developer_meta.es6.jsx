// Require React
import React from 'react';
import mui from 'material-ui';

const Colors = mui.Styles.Colors;

const DeveloperMeta = props => (
  <ul className="no-style fs-14 hidden-sm" style={{ color: Colors.grey600 }}>
    <li className="text-center inline m-r-20">
      <span>Followers</span>
      <span className="block m-t-5">{props.developer.followers}</span>
    </li>
    <li className="text-center inline m-r-20">
      <span>Gists</span>
      <span className="block m-t-5">{props.developer.gists}</span>
    </li>
    <li className="text-center inline m-r-20">
      <span>Repos</span>
      <span className="block m-t-5">{props.developer.repos}</span>
    </li>
  </ul>
);

DeveloperMeta.propTypes = {
  developer: React.PropTypes.object,
};

export default DeveloperMeta;
