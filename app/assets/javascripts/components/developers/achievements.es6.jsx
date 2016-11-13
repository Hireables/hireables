// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';

// Child Components icons
import Github from './achievements/github.es6';
import StackOverflow from './achievements/stackoverflow.es6';
import Linkedin from './achievements/linkedin.es6';
import Youtube from './achievements/youtube.es6';

// Register components to a Map()
const componentsMap = new Map();
componentsMap.set('github', Github);
componentsMap.set('stackoverflow', StackOverflow);
componentsMap.set('linkedin', Linkedin);
componentsMap.set('youtube', Youtube);

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
    const renderAchievementComponent = (achievement) => {
      const Achievement = componentsMap.get(achievement.source_name);
      return <Achievement achievement={achievement} key={achievement.id} />;
    };

    return (
      <section className="achievements">
        {developer.achievements.edges.map(({ node }) => (
          renderAchievementComponent(node)
        ))}
      </section>
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
              source_name,
              ${Github.getFragment('achievement')},
              ${StackOverflow.getFragment('achievement')},
              ${Linkedin.getFragment('achievement')},
              ${Youtube.getFragment('achievement')},
            }
          }
        }
      }
    `,
  },
});

export default DeveloperAchievementsContainer;
