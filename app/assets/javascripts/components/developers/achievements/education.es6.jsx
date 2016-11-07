// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
} from 'material-ui/Card';

class EducationAchievement extends Component {
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
    return (
      <div className="achievement">
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar="images/jsa-128.jpg"
          />
          <CardTitle title={achievement.title} subtitle={achievement.date} />
          <CardText>
            {achievement.description}
          </CardText>
        </Card>
      </div>
    );
  }
}

EducationAchievement.propTypes = {
  relay: React.PropTypes.object,
  achievement: React.PropTypes.object,
};

const EducationAchievementContainer = Relay.createContainer(EducationAchievement, {
  fragments: {
    achievement: () => Relay.QL`
      fragment on Achievement {
        id,
        title,
        description,
        link,
        date,
      }
    `,
  },
});

export default EducationAchievementContainer;
