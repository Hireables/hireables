// Modules
import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';

// StyleSheets
import badgeStyles from '../styles/badges.es6';

const Languages = (props) => {
  const { developer } = props;

  return (
    <div className="skills">
      {developer.platforms.length > 0 ?
        <div style={{ marginTop: '10px' }}>
          <div className="header-separator top-margin">Platforms</div>
          <span>
            {developer.platforms.map(platform => (
              <a
                key={Math.random()}
                href={`/search?language=${platform.trim().toLowerCase()}`}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                {platform}
              </a>
            ))}
          </span>
        </div> : ''
      }
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
