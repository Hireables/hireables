// Modules

/* global document Turbolinks */

import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';
import queryString from 'query-string';
import _ from 'underscore';

// StyleSheets
import chipStyles from '../styles/chips.es6';
import Colors from '../../utils/colors.json';

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

  const getColor = (language) => {
    const obj = Colors[language];
    return obj === undefined ? '#333' : obj;
  };

  return (
    <div className="languages">
      {developer.languages && developer.languages.length > 0 ?
        <div className={css(chipStyles.wrapper)}>
          <div className="header-separator">Languages and Frameworks</div>
          {developer.languages.map(platform => (
            <div
              key={Math.random()}
              onClick={() => Turbolinks.visit(`/search?${query(platform)}`)}
            >
              <span style={{ backgroundColor: getColor(platform) }} />
              {platform}
            </div>
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
        languages,
      }
    `,
  },
});

export default LanguagesContainer;
