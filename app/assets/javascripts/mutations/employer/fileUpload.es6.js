import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { EmployerFileUpload }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EmployerFileUploadPayload {
        employer,
      }
    `;
  }

  getFiles() {
    return {
      file: this.props.file,
    };
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
      id: this.props.id,
    };
  }
}
