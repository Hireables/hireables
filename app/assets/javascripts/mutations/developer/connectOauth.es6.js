import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ConnectOauth }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ConnectOauthPayload {
        developer {
          connections
        }
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          developer: this.props.id,
        },
      },
    ];
  }

  getVariables() {
    return {
      ...this.props,
    };
  }
}
