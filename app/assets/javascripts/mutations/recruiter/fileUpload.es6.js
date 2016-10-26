import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { RecruiterFileUpload }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RecruiterFileUploadPayload {
        recruiter,
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
          recruiter: this.props.id,
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
