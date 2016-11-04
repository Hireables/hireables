import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ UpdateDeveloper }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateDeveloperPayload {
        developer
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
