// Modules
import React from 'react';
import Relay from 'react-relay';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import marked from 'marked';
import Languages from '../../../utils/languages.json';

// Child Components icons
import GithubIcon from '../../shared/icons/github.es6';
import { sanitizeText } from '../../../utils/sanitize.es6';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

const Github = (props) => {
  const { achievement, remove } = props;
  const starFields = { pr: 'comments', repo: 'stargazers_count' };
  const count = achievement[starFields[achievement.category]];

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
                <span>Open Source</span>
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
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {achievement.title}
                    </a>
                  </div>
                }
              />

              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{
                  __html: sanitizeText(achievement.description),
                }}
              />

              <CardActions className="meta">
                <span className="badge">
                  {achievement.category}
                </span>

                {achievement.language ?
                  <span
                    className="badge"
                    style={{
                      backgroundColor: Languages[achievement.language],
                    }}
                  >
                    {achievement.language}
                  </span> : ''
                }

                <span className="badge">
                  {`${count}`}
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
      fragment on Achievement {
        id,
        title,
        description,
        source_name,
        category,
        developer_id,
        import_id,
        language,
        link,
        is_owner,
        comments,
        stargazers_count,
        date,
      }
    `,
  },
});

export default GithubContainer;
