// Modules
import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';

// StyleSheets
import badgeStyles from '../styles/badges.es6';

const Levels = (props) => {
  const { developer } = props;

  return (
    <div className="levels">
      {developer.cto ||
        developer.lead ||
        developer.senior ||
        developer.mid ||
        developer.junior ||
        developer.student ?
          <div style={{ marginTop: '10px' }}>
            <div className="header-separator top-margin">Levels</div>
            {developer.cto ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                CTO
              </span> : ''
            }

            {developer.lead ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Lead
              </span> : ''
            }

            {developer.senior ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Senior
              </span> : ''
            }


            {developer.mid ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Mid-Level
              </span> : ''
            }

            {developer.junior ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Junior
              </span> : ''
            }

            {developer.student ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Student
              </span> : ''
            }
          </div> : ''
        }
    </div>
  );
};

Levels.propTypes = {
  developer: React.PropTypes.object,
};

const LevelsContainer = Relay.createContainer(Levels, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        cto,
        lead,
        senior,
        mid,
        junior,
        student,
      }
    `,
  },
});

export default LevelsContainer;
