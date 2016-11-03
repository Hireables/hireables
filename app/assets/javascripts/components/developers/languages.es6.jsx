// Modules

/* global document */

import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import queryString from 'query-string';
import _ from 'underscore';

// StyleSheets
import chipStyles from '../styles/chips.es6';

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
    <div className="languages">
      {developer.platforms.length > 0 ?
        <div className={css(chipStyles.wrapper)}>
          <div className="header-separator">Languages and Frameworks</div>
          {developer.platforms.map(platform => (
            <Chip
              key={Math.random()}
              className={css(chipStyles.chip)}
              onTouchTap={() => Turbolinks.visit(`/search?${query(platform)}`)}
            >
              <Avatar
                icon={<FontIcon className="material-icons">code</FontIcon>}
              />
              {platform}
            </Chip>
          ))}
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
