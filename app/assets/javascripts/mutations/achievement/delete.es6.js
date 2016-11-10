import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ AchievementDelete }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AchievementDeletePayload {
        deletedId
        developer {
          id,
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'NODE_DELETE',
        parentName: 'developer',
        parentID: this.props.developerId,
        connectionName: 'achievements',
        deletedIDFieldName: 'deletedId',
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }
}
