// Modules
import React from 'react';
import Relay from 'react-relay';
import { sanitizeText } from '../../utils/sanitize.es6';
import '../styles/bio.sass';

const Bio = props => (
  <div className="bio">
    {props.developer.bio ?
      <span
        dangerouslySetInnerHTML={{ __html: sanitizeText(props.developer.bio) }}
      /> : ''
    }
  </div>
);

Bio.propTypes = {
  developer: React.PropTypes.object,
};

const BioContainer = Relay.createContainer(
  Bio, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          bio,
        }
      `,
    },
  }
);

export default BioContainer;
