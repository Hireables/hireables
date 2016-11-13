/* global $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment';

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
              <CardTitle
                className="achievement-card-header"
                title={
                  <div className="title">
                    {achievement.title}
                  </div>
                }
                subtitle={
                  <time className="subtitle date">
                    {moment.utc(new Date(achievement.created_at)).local().format('DD.MM.YYYY')}
                  </time>
                }
              />

              <CardText
                className="achievement-card-description"
                dangerouslySetInnerHTML={{ __html: description }}
              />
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
        pinned,
        created_at,
      }
    `,
  },
});

export default LinkedinContainer;
