import React from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';

const bioStyles = {
  fontSize: '14px',
  maxWidth: '60%',
  display: 'block',
  marginTop: '10px',
  fontWeight: '400',
};

const DeveloperBio = (props) => {
  const bio = createDOMPurify.sanitize(
    props.developer.bio,
    { ALLOWED_TAGS: ['b', 'i'] }
  );

  return (
    <div>
      {props.developer.bio ?
        <span
          style={bioStyles}
          className="bio"
          dangerouslySetInnerHTML={{ __html: bio }}
        /> : ''
      }
    </div>
  );
};

DeveloperBio.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperBioContainer = Relay.createContainer(
  DeveloperBio, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          bio,
        }
      `,
    },
  }
);

export default DeveloperBioContainer;
