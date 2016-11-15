import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ ToggleFavourite }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ToggleFavouritePayload {
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
      id: this.props.id,
      login: this.props.login
    };
  }

  getOptimisticResponse() {
    return {
      developer: {
        id: this.props.id,
        favourited: !this.props.favourited
      }
    };
  }
}
