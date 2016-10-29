import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ UpdateRecruiter }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateRecruiterPayload {
        recruiter
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          recruiter: this.props.id,
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
