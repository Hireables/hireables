// Modules

/* global document Turbolinks */

import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';
import queryString from 'query-string';
import _ from 'underscore';
import Chip from 'material-ui/Chip';

// StyleSheets
import iconStyles from '../styles/icons.es6';
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
        <div
          className={css(iconStyles.links)}
          style={{ maxWidth: '80%' }}
        >
          <div className="header-separator">Programming Languages</div>
          {developer.languages.map(platform => (
            <Chip
              key={Math.random()}
              labelStyle={{ fontSize: 14 }}
              style={{ cursor: 'pointer' }}
              className={css(iconStyles.linkIcon, iconStyles.hover, iconStyles.bordered)}
              onClick={() => Turbolinks.visit(`/search?${query(platform)}`)}
            >
              <span
                style={{
                  backgroundColor: getColor(platform),
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  marginRight: 10,
                  display: 'inline-block',
                }}
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
        languages,
      }
    `,
  },
});

export default LanguagesContainer;
