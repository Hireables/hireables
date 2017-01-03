import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ RemoveAchievement }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveAchievementPayload {
        deletedId,
        import {
          id,
          pinned,
        },
        developer {
          id,
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          import: this.props.id,
        },
      }, {
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
      import_id: this.props.importId,
    };
  }
}
