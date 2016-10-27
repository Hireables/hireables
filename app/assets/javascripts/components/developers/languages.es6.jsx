import React from 'react';
import Relay from 'react-relay';
import '../styles/badges.sass';

const Languages = (props) => {
  const { developer } = props;

  return (
    <div style={{ marginTop: '10px' }}>
      <span>
        {developer.platforms.length > 0 ? developer.platforms.map(platform => (
          <a
            key={Math.random()}
            href={`/search?language:${platform.trim().toLowerCase()}`}
            className="badge tag"
          >
            {platform}
          </a>
        )) : ''}
      </span>
    </div>
  );
};

Languages.propTypes = {
  developer: React.PropTypes.object,
};

const LanguagesContainer = Relay.createContainer(Languages, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        platforms,
      }
    `,
  },
});

export default LanguagesContainer;
