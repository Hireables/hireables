// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';
import Languages from '../../../../utils/languages.json';

// Child Components icons
import GithubIcon from '../../../shared/icons/github.es6';
import { sanitizeRichText } from '../../../../utils/sanitize.es6';
import AchievementForm from '../form.es6';
import AchievementActions from '../actions.es6';

class Github extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.state = {
      editing: false,
    };
  }

  edit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const { achievement, remove, update } = this.props;
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
                  <AchievementActions
                    achievement={achievement}
                    remove={remove}
                    edit={this.edit}
                  /> : ''
                }

                <time className="date">
                  {
                    moment(achievement.date, 'YYYY-MM-DD HH:mm:ss [UTC]')
                    .format('MMMM Do YYYY')
                    .toString()
                  }
                </time>

                {this.state.editing ?
                  <AchievementForm
                    achievement={achievement}
                    update={update}
                    edit={this.edit}
                  /> :
                  <div className="achievement-content">
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
                        __html: sanitizeRichText(achievement.description),
                      }}
                    />
                  </div>
                }

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
  }
}

Github.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
  update: React.PropTypes.func,
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
        ${AchievementActions.getFragment('achievement')},
        ${AchievementForm.getFragment('achievement')},
      }
    `,
  },
});

export default GithubContainer;
