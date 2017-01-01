/* global $ */

// Modules
import React from 'react';
import Relay from 'react-relay';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';

// Child Components icons
import LinkedinIcon from '../../shared/icons/linkedin.es6';
import { sanitizeText } from '../../../utils/sanitize.es6';

const Linkedin = (props) => {
  const { achievement, remove } = props;
  return (
    <div className={`achievement ${achievement.source_name}`}>
      <div className="achievement-block">
        <div className={`achievement-point ${achievement.source_name}`}>
          <LinkedinIcon />
        </div>
        <div className="achievement-content">
          <Card className="achievement-card full-width">
            <div className="achievement-card-content">
              <h2 className="intro">
                <i className="icon material-icons">work</i>
                Position
              </h2>

              {achievement.is_owner ?
                <IconButton
                  className="remove"
                  tooltip="Remove"
                  tooltipStyles={{ top: 25 }}
                  onClick={event => remove(event, achievement)}
                >
                  <FontIcon className="material-icons">close</FontIcon>
                </IconButton> : ''
              }

              <time className="date">
                {
                  moment(achievement.date, 'YYYY-MM-DD HH:mm:ss [UTC]')
                  .format('MMMM Do YYYY')
                  .toString()
                }
              </time>

              <CardTitle
                className="achievement-card-header"
                title={
                  <div className="title">
                    {achievement.title}
                  </div>
                }
                subtitle={achievement.company}
              />
              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{
                  __html: sanitizeText(achievement.description),
                }}
              />
              <CardActions className="meta">
                {achievement.isCurrent ?
                  <span className="badge">
                    Current Position
                  </span> : 'Position'
                }
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

Linkedin.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
};

const LinkedinContainer = Relay.createContainer(Linkedin, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        description,
        source_name,
        developer_id,
        company,
        is_owner,
        isCurrent,
        date,
      }
    `,
  },
});

export default LinkedinContainer;
