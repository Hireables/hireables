// Modules
import React from 'react';
import Relay from 'react-relay';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import Languages from '../../../utils/languages.json';

// Child Components icons
import GithubIcon from '../../shared/icons/github.es6';
import sanitize from '../../../utils/sanitize.es6';

const Github = (props) => {
  const { achievement, remove } = props;

  return (
    <div className={`achievement ${achievement.source_name}`}>
      <div className="achievement-block">
        <div className={`achievement-point ${achievement.source_name}`}>
          <GithubIcon />
        </div>

        <div className="achievement-content">
          <Card className="achievement-card full-width">
            <div className="achievement-card-content">
              <h2 className="intro">
                <i className="icon material-icons">lock_open</i>
                <span>Open Source </span>
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
                  moment
                  .utc(new Date(achievement.created_at))
                  .local()
                  .format('MMMM Do YYYY')
                }
              </time>

              <CardTitle
                className="achievement-card-header"
                title={
                  <div className="title">
                    <a
                      href={achievement.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {achievement.name.replace(/[_-]/g, ' ')}
                    </a>
                  </div>
                }
              />

              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{
                  __html: sanitize(achievement.description),
                }}
              />

              <CardActions className="meta">
                <span
                  className="badge"
                  style={{
                    backgroundColor: Languages[achievement.language],
                  }}
                >
                  {achievement.language}
                </span>

                <span className="badge">
                  {`${achievement.stargazers_count}`}
                  <FontIcon
                    color="#fff"
                    className="material-icons"
                    style={{
                      fontSize: 20,
                      verticalAlign: 'top',
                      marginLeft: 5,
                    }}
                  >
                    star
                  </FontIcon>
                </span>
              </CardActions>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

Github.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
};

const GithubContainer = Relay.createContainer(Github, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        name,
        source_name,
        description,
        developer_id,
        connection_id,
        language,
        html_url,
        is_owner,
        stargazers_count,
        pinned,
        created_at,
      }
    `,
  },
});

export default GithubContainer;
