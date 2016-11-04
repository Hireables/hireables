import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ UpdateEmployer }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateEmployerPayload {
        employer
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          employer: this.props.id,
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
