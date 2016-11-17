/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import { Card, CardTitle, CardActions, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';

// Child Components icons
import LinkedinIcon from '../../shared/icons/linkedin.es6';
import sanitize from '../../../utils/sanitize.es6';

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
    const { achievement, remove } = this.props;

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
                      {achievement.title}
                    </div>
                  }
                  subtitle={achievement.company}
                />
                <CardText
                  className="achievement-card-description"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(achievement.summary),
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
  }
}

Linkedin.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
  remove: React.PropTypes.func,
};

const LinkedinContainer = Relay.createContainer(Linkedin, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Import {
        id,
        title,
        summary,
        source_name,
        developer_id,
        connection_id,
        company,
        is_owner,
        pinned,
        isCurrent,
        created_at,
      }
    `,
  },
});

export default LinkedinContainer;
