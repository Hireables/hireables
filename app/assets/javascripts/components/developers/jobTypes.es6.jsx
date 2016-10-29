// Modules
import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';

// StyleSheets
import badgeStyles from '../styles/badges.es6';

const JobTypes = (props) => {
  const { developer } = props;

  return (
    <div className="job-types">
      {developer.full_time ||
        developer.part_time ||
        developer.contract ||
        developer.freelance ||
        developer.startup ||
        developer.internship ?
          <div className="badges">
            <div className="header-separator">Job Types</div>
            {developer.full_time ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Full-Time
              </span> : ''
            }

            {developer.part_time ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Part-Time
              </span> : ''
            }

            {developer.contract ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Contract
              </span> : ''
            }


            {developer.freelance ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Freelance
              </span> : ''
            }

            {developer.startup ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Startup
              </span> : ''
            }

            {developer.internship ?
              <span
                key={Math.random()}
                className={css(badgeStyles.badge, badgeStyles.tag)}
              >
                Internship
              </span> : ''
            }
          </div> : ''
      }
    </div>
  );
};

JobTypes.propTypes = {
  developer: React.PropTypes.object,
};

const JobTypesContainer = Relay.createContainer(JobTypes, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        full_time,
        part_time,
        contract,
        freelance,
        startup,
        internship,
      }
    `,
  },
});

export default JobTypesContainer;
