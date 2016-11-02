// Modules

/* global document */

import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';
import queryString from 'query-string';
import _ from 'underscore';

// StyleSheets
import badgeStyles from '../styles/badges.es6';

const Languages = (props) => {
  const { developer } = props;
  const queryObject = _.pick(
    queryString.parse(document.location.search),
    ['language', 'location', 'page', 'hireable', 'repos']
  );

  const query = (language) => {
    const newQuery = Object.assign(queryObject, { language });
    return queryString.stringify(newQuery);
  };

  return (
    <div className="skills">
      {developer.platforms.length > 0 ?
        <div className="badges">
          <div className="header-separator">Platforms</div>
          <span>
            {developer.platforms.map(platform => (
              <a
                key={Math.random()}
                href={`/search?${query(platform)}`}
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
