/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';

// Child Components icons
import LinkedinIcon from '../../shared/icons/linkedin.es6';

class Linkedin extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.edit.bind(this);
  }

  edit() {
    this.setState({ editing: true });
    console.log('enable edit form');
  }

  delete() {
    this.setState({ deleting: true });
    console.log('Delete mutation');
  }

  render() {
    const { achievement } = this.props;
    const description = createDOMPurify.sanitize(
      achievement.summary,
      { ALLOWED_TAGS: ['b', 'i', 'code'] }
    );
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
                  <span>Joined </span>
                  {achievement.company}
                </h2>

                <time className="date">
                  on {moment.utc(new Date(achievement.created_at)).local().format('MMMM Do YYYY')}
                </time>

                <CardTitle
                  className="achievement-card-header"
                  title={
                    <div className="title">
                      {achievement.title}
                    </div>
                  }
                />
                <CardText
                  className="achievement-card-description"
                  dangerouslySetInnerHTML={{ __html: description }}
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
  }
}

Linkedin.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
};

const LinkedinContainer = Relay.createContainer(Linkedin, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        title,
        summary,
        source_name,
        company,
        pinned,
        isCurrent,
        created_at,
      }
    `,
  },
});

export default LinkedinContainer;
