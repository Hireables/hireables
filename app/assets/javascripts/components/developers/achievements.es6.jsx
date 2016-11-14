// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';

// Child Components icons
import Github from './achievements/github.es6';
import StackOverflow from './achievements/stackoverflow.es6';
import Linkedin from './achievements/linkedin.es6';
import Youtube from './achievements/youtube.es6';
import Connections from './connections.es6';

// Register components to a Map()
const componentsMap = new Map();
componentsMap.set('github', Github);
componentsMap.set('stackoverflow', StackOverflow);
componentsMap.set('linkedin', Linkedin);
componentsMap.set('youtube', Youtube);

const renderEmptyPlaceholder = () => (
  <div
    className="no_content text-center"
    style={{
      marginLeft: 100,
      border: '5px solid #f2f2f2',
      color: '#777',
    }}
  >
    <h1 style={{ fontWeight: 500, fontSize: 18 }}>
      No pinned achievements or contributions
    </h1>
  </div>
);

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
    const { developer, canEdit } = this.props;
    const renderAchievementComponent = (achievement) => {
      const Achievement = componentsMap.get(achievement.source_name);
      return <Achievement achievement={achievement} key={achievement.id} />;
    };

    return (
      <section className="achievements">
        <div className="starting-point" />
        <div
          className="achievements-intro"
          style={{
            textAlign: 'center',
            margin: '50px 0 50px 100px',
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 500 }}>
            Contributions and Achievements
          </h2>
          <p style={{ color: '#777', maxWidth: '90%', margin: '5px auto' }}>
            {canEdit ?
              'Import and Pin your contributions and achievements from Github, ' +
              'StackOverflow, Linkedin and Youtube.' :
              'Pinned contributions and achievements from Github, ' +
              'StackOverflow, Linkedin and Youtube'
            }
          </p>
        </div>

        {canEdit ? <Connections developer={developer} canEdit={canEdit} /> : ''}

        {developer.achievements.edges.length > 0 ?
          developer.achievements.edges.map(({ node }) => (
            renderAchievementComponent(node)
          )) : canEdit ? '' : renderEmptyPlaceholder()
        }
      </section>
    );
  }
}

DeveloperAchievements.propTypes = {
  relay: React.PropTypes.object,
  canEdit: React.PropTypes.bool,
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
        ${Connections.getFragment('developer')},
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
