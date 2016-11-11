import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ImportCreate }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ImportCreatePayload {
        importEdge
        developer {
          id,
          connections {
            data,
          }
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
