// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import moment from 'moment';

// Child Components icons
import LinkedinIcon from '../../shared/icons/linkedin.es6';
import { sanitizeText } from '../../../utils/sanitize.es6';
import AchievementForm from './form.es6';
import AchievementActions from './actions.es6';

class Linkedin extends Component {
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
                  </div>
                }

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
  }
}

Linkedin.propTypes = {
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
  update: React.PropTypes.func,
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
        import_id,
        company,
        is_owner,
        isCurrent,
        date,
        ${AchievementActions.getFragment('achievement')},
        ${AchievementForm.getFragment('achievement')},
      }
    `,
  },
});

export default LinkedinContainer;
