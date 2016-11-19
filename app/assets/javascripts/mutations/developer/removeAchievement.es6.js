import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ RemoveAchievement }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveAchievementPayload {
        deletedId,
        developer {
          id,
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'developer',
      parentID: this.props.developerId,
      connectionName: 'achievements',
      deletedIDFieldName: 'deletedId',
    }];
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }

  getOptimisticResponse() {
    return {
      deletedId: this.props.id,
    };
  }
}
