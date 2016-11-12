// Modules
import React from 'react';
import Relay from 'react-relay';
import { css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

// StyleSheets
import chipStyles from '../styles/chips.es6';

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
          <div className={css(chipStyles.wrapper)}>
            <div className="header-separator">Levels</div>
            {developer.cto ?
              <Chip
                labelStyle={{ fontSize: 15 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >label</FontIcon>
                  }
                />
                CTO
              </Chip> : ''
            }

            {developer.lead ?
              <Chip
                labelStyle={{ fontSize: 15 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >label</FontIcon>
                  }
                />
                Lead
              </Chip> : ''
            }

            {developer.senior ?
              <Chip
                labelStyle={{ fontSize: 15 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >label</FontIcon>
                  }
                />
                Senior
              </Chip> : ''
            }


            {developer.mid ?
              <Chip
                labelStyle={{ fontSize: 15 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >label</FontIcon>
                  }
                />
                Mid-Level
              </Chip> : ''
            }

            {developer.junior ?
              <Chip
                labelStyle={{ fontSize: 15 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >label</FontIcon>
                  }
                />
                Junior
              </Chip> : ''
            }

            {developer.student ?
              <Chip
                labelStyle={{ fontSize: 15 }}
                key={Math.random()}
                className={css(chipStyles.chip)}
              >
                <Avatar
                  className={css(chipStyles.iconAvatar)}
                  icon={
                    <FontIcon
                      className={`material-icons ${css(chipStyles.chipIcon)}`}
                    >label</FontIcon>
                  }
                />
                Student
              </Chip> : ''
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
