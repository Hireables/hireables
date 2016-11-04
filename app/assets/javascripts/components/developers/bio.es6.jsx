// Modules
import React from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';

// Stylesheets
import '../styles/bio.sass';

const Bio = (props) => {
  const bio = createDOMPurify.sanitize(
    props.developer.bio,
    { ALLOWED_TAGS: ['b', 'i'] }
  );

  return (
    <div className="bio">
      {props.developer.bio ?
        <span dangerouslySetInnerHTML={{ __html: bio }} /> : ''
      }
    </div>
  );
};

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
