import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ AddAchievement }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddAchievementPayload {
        achievementEdge,

        developer {
          id,
        },

        import {
          id,
          pinned,
        },
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          developer: this.props.developerId,
        },
      }, {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          import: this.props.id,
        },
      }, {
        type: 'RANGE_ADD',
        parentName: 'developer',
        parentID: this.props.developerId,
        connectionName: 'achievements',
        edgeName: 'achievementEdge',
        rangeBehaviors: {
          '': 'prepend',
          'order(id)': 'append',
          'order(-id)': 'prepend',
        },
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }
}
