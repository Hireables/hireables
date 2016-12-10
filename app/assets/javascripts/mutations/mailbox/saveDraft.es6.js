import Relay from 'react-relay';

export default class extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{ MarkAsReadMutation }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on MarkAsReadMutationPayload {
        conversation {
          id,
          is_unread,
        },
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          conversation: this.props.conversationId,
        },
      },
    ];
  }

  getVariables() {
    return {
      id: this.props.conversationId,
    };
  }

  getOptimisticResponse() {
    return {
      connection: {
        id: this.props.conversationId,
        is_unread: false,
      }
    };
  }
}
