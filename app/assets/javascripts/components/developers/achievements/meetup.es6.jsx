// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';
import Truncate from 'react-truncate';

// Child Components icons
import MeetupIcon from '../../shared/icons/meetup.es6';
import { sanitizeText } from '../../../utils/sanitize.es6';
import AchievementForm from './form.es6';
import AchievementActions from './actions.es6';

class Meetup extends Component {
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
    return (
      <div className={`achievement ${achievement.source_name}`}>
        <div className="achievement-block">
          <div className={`achievement-point ${achievement.source_name}`}>
            <MeetupIcon />
          </div>
          <div className="achievement-content">
            <Card className="achievement-card full-width">
              <div className="achievement-card-content">
                <h2 className="intro">
                  <i className="icon material-icons">event</i>
                  Meetup
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

                    <Truncate
                      lines={5}
                      className="achievement-card-description"
                      ellipsis={
                        <span>...
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={achievement.link}
                          >
                            Read more
                          </a>
                        </span>
                      }
                    >
                      <CardText
                        dangerouslySetInnerHTML={{
                          __html: sanitizeText(achievement.description).replace(/&nbsp;/g, ''),
                        }}
                      />
                    </Truncate>
                  </div>
                }

                <CardActions className="meta">
                  <span className="badge">
                    {`${achievement.yes_rsvp_count}`}
                    <FontIcon
                      color="#333"
                      className="material-icons"
                      style={{
                        fontSize: 20,
                        verticalAlign: 'top',
                        marginLeft: 5,
                      }}
                    >
                      people
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

Meetup.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
  update: React.PropTypes.func,
};

const MeetupContainer = Relay.createContainer(Meetup, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        description,
        source_name,
        import_id,
        link,
        is_owner,
        yes_rsvp_count,
        developer_id,
        date,
        ${AchievementActions.getFragment('achievement')},
        ${AchievementForm.getFragment('achievement')},
      }
    `,
  },
});

export default MeetupContainer;
