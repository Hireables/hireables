import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ImportDelete }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ImportDeletePayload {
        deletedId
        developer {
          id,
          imports,
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
