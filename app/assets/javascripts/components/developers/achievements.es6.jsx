// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';

// Child Components
import Code from './achievements/code.es6';
import Repo from './achievements/repo.es6';
import Education from './achievements/education.es6';
import Job from './achievements/job.es6';
import Answer from './achievements/answer.es6';
import Talk from './achievements/talk.es6';
import Presentation from './achievements/presentation.es6';

const achievementsMap = new Map();
achievementsMap.set('Code', Code);
achievementsMap.set('Repo', Repo);
achievementsMap.set('Education', Education);
achievementsMap.set('Job', Job);
achievementsMap.set('Answer', Answer);
achievementsMap.set('Talk', Talk);
achievementsMap.set('Presentation', Presentation);

class DeveloperAchievements extends Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.props.relay.setVariables({
      first: this.props.relay.variables.first + 20,
    });
  }

  render() {
    const { developer } = this.props;

    const renderAchievement = (node) => {
      const Achievement = achievementsMap[node.type];
      return <Achievement achievement={node} key={node.id} />;
    };

    return (
      <div className="achievements">
        {developer.achievements.map(({ node }) => (renderAchievement(node)))}
      </div>
    );
  }
}

DeveloperAchievements.propTypes = {
  relay: React.PropTypes.object,
  developer: React.PropTypes.object,
};

const DeveloperAchievementsContainer = Relay.createContainer(DeveloperAchievements, {
  initialVariables: {
    first: 20,
  },
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        achievements(first: $first) {
          edges {
            node {
              id,
              ${Code.getFragment('achievement')},
              ${Repo.getFragment('achievement')},
              ${Education.getFragment('achievement')},
              ${Job.getFragment('achievement')},
              ${Answer.getFragment('achievement')},
              ${Talk.getFragment('achievement')},
              ${Presentation.getFragment('achievement')},
            }
          }
        }
      }
    `,
  },
});

export default DeveloperAchievementsContainer;
