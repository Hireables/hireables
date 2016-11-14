// Modules
import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

// StyleSheets
import chipStyles from '../styles/chips.es6';

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
          <div className={css(chipStyles.wrapper)}>
            <div className="header-separator">Job Preferences</div>
            {developer.full_time ?
              <Chip
                labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >work</FontIcon>}
                />
                Full-Time
              </Chip> : ''
            }

            {developer.part_time ?
              <Chip
                labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >work</FontIcon>}
                />
                Part-Time
              </Chip> : ''
            }

            {developer.contract ?
              <Chip
                labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >work</FontIcon>}
                />
                Contract
              </Chip> : ''
            }


            {developer.freelance ?
              <Chip
                labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >work</FontIcon>}
                />
                Freelance
              </Chip> : ''
            }

            {developer.startup ?
              <Chip
                labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >work</FontIcon>}
                />
                Startup
              </Chip> : ''
            }

            {developer.internship ?
              <Chip
                labelStyle={{ fontSize: 15, paddingLeft: 5 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >work</FontIcon>}
                />
                Internship
              </Chip> : ''
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
