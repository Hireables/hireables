// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import createDOMPurify from 'dompurify';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';

class Achievement extends Component {
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
      achievement.description,
      { ALLOWED_TAGS: ['b', 'i', 'code'] }
    );
    return (
      <div className={`achievement ${achievement.source} ${achievement.category}`}>
        <Card>
          <CardTitle title={achievement.title} subtitle={achievement.date} />
          <CardText dangerouslySetInnerHTML={{ __html: description }} />
        </Card>
      </div>
    );
  }
}

Achievement.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
};

const AchievementContainer = Relay.createContainer(Achievement, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        source,
        category,
        description,
        link,
        date,
      }
    `,
  },
});

export default AchievementContainer;
