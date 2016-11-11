import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ToggleAchievement }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ToggleAchievementPayload {
        developer {
          id,
          connections,
          achievements,
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'developer',
        parentID: this.props.developerId,
        connectionName: 'achievements',
        edgeName: 'achievementEdge',
        rangeBehaviors: {
          '': 'append',
          'order(-id)': 'prepend',
        },
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.id,
      selection: this.props.selection,
    };
  }
}
